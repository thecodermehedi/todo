import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import { checkAndSeedDatabase } from './seed';

// Types
type AppConfig = {
 port: number;
 mongoUri: string;
 dbName: string;
};

const config: AppConfig = {
 port: parseInt(process.env.PORT as string) || 3000,
 mongoUri: process.env.DB_URI as string,
 dbName: process.env.DB_NAME as string
};

// Initialize express app
const app = express();

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
   let query: { priority?: string } = {};
   if (req.query.priority) {
    query.priority = req.query.priority as string;
   }
   const cursor = taskCollection.find(query);
   const tasks = await cursor.toArray();
   res.send({ status: true, data: tasks });
  });

  app.post('/task', async (req, res) => {
   const task = req.body;
   const result = await taskCollection.insertOne(task);
   res.send(result);
  });

  app.get('/task/:id', async (req, res) => {
   const id = req.params.id;
   const result = await taskCollection.findOne({ _id: new ObjectId(id) });
   // console.log(result);
   res.send(result);
  });

  app.delete('/task/:id', async (req, res) => {
   const id = req.params.id;
   const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
   // console.log(result);
   res.send(result);
  });

  // status update
  app.put('/task/:id', async (req, res) => {
   const id = req.params.id;
   console.log(id);
   const task = req.body;
   const filter = { _id: new ObjectId(id) };
   const updateDoc = {
    $set: {
     isCompleted: task.isCompleted,
     title: task.title,
     description: task.description,
     priority: task.priority,
    },
   };
   const options = { upsert: true };
   const result = await taskCollection.updateOne(filter, updateDoc, options);
   res.json(result);
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
