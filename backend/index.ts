import cors from 'cors';
import express, { type Application } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { checkAndSeedDatabase } from './seed';

// Types
type AppConfig = {
 port: number;
 mongoUri: string;
 dbName: string;
};

const config: AppConfig = {
 port: parseInt(process.env.PORT as string) || 3000,
 mongoUri: process.env.DB_URI || "mongodb://localhost:27017",
 dbName: process.env.DB_NAME || "todoDB"
};

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
const connectDB = async () => {
 try {
  const client = new MongoClient(config.mongoUri);
  await client.connect();
  console.log('MongoDB Connected Successfully');
  return client.db(config.dbName);
 } catch (error) {
  console.error('MongoDB Connection Error:', error);
  process.exit(1);
 }
};

// Routes
app.get('/', (req, res) => {
 res.send('Welcome to Todo Server - A REST API for managing todos');
});

// Health check endpoint
app.get('/health', (req, res) => {
 res.status(200).json({
  status: 'ok',
  service: 'todo-server',
  database: 'todoDB'
 });
});



// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
 console.error(err.stack);
 res.status(500).json({
  error: 'Internal Server Error',
  message: err.message
 });
});

// IIFE to start the server
(async () => {
 try {
  const db = await connectDB();
  const taskCollection = db.collection('tasks');

  app.get('/seed', async (req, res) => {
   try {
    const result = await checkAndSeedDatabase(taskCollection);
    if (result) {
     res.json({
      message: 'Database seeded successfully!',
      insertedCount: result.insertedCount
     });
    } else {
     res.json({
      message: 'Database already contains data, no seeding required'
     });
    }
   } catch (error) {
    res.status(500).json({
     error: 'Seeding error',
     message: error instanceof Error ? error.message : 'Unknown error'
    });
   }
  });

  app.get('/tasks', async (req, res) => {
   try {
    let query: { priority?: string } = {};
    if (req.query.priority) {
     query.priority = req.query.priority as string;
    }
    const tasks = await taskCollection.find(query).toArray();
    if (tasks.length > 0) {
     res.status(200).json({ status: 'success', data: tasks, message: 'Tasks retrieved successfully' });
    } else {
     res.status(200).json({ status: 'success', message: 'No tasks found' });
    }
   } catch (error) {
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
   }
  });

  app.get('/task/:id', async (req, res) => {
   try {
    const id = req.params.id;
    const result = await taskCollection.findOne({ _id: new ObjectId(id) });
    if (result) {
     res.status(200).json({ status: 'success', data: result, message: 'Task retrieved successfully' });
    } else {
     res.status(404).json({ status: 'error', message: 'Task not found' });
    }
   } catch (error) {
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
   }
  });

  app.post('/tasks', async (req, res) => {
   try {
    const task = req.body;
    const result = await taskCollection.insertOne(task);
    res.status(201).json({ status: 'success', data: result, message: 'Task created successfully' });
   } catch (error) {
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
   }
  });

  app.put('/task/:id', async (req, res) => {
   const id = req.params.id;
   try {
    const task = req.body;
    const filter = { _id: new ObjectId(id) };
    const updateDoc: { $set: any } = { $set: {} };

    if (task.title !== undefined) updateDoc.$set.title = task.title;
    if (task.description !== undefined) updateDoc.$set.description = task.description;
    if (task.priority !== undefined) updateDoc.$set.priority = task.priority;
    if (task.isCompleted !== undefined) updateDoc.$set.isCompleted = task.isCompleted;

    const options = { upsert: false };
    const result = await taskCollection.updateOne(filter, updateDoc, options);
    if (result.matchedCount > 0) {
     res.json({ status: 'success', message: 'Task updated successfully' });
    } else {
     res.json({ status: 'success', message: 'Task not found' });
    }
   } catch (error) {
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
   }
  });

  app.delete('/task/:id', async (req, res) => {
   try {
    const id = req.params.id;
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
     res.status(200).json({ status: 'success', message: 'Task deleted successfully' });
    } else {
     res.status(404).json({ status: 'error', message: 'Task not found' });
    }
   } catch (error) {
    res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' });
   }
  });




  // Log server details
  app.listen(config.port, () => {
   console.log('🚀 Todo Server is running!');
   console.log(`📡 Server: http://localhost:${config.port}`);
   console.log(`📦 Database: ${config.dbName}`);
  });
 } catch (error) {
  console.error('Server startup error:', error);
  process.exit(1);
 }
})();
