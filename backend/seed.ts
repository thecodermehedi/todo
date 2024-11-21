import { Collection } from 'mongodb';

// Types
export type Task = {
 title: string;
 description: string;
 isCompleted: boolean;
 priority: 'low' | 'medium' | 'high';
};

// Seed data
const seedData: Task[] = [
 {
  title: 'Finish the Todo Server project',
  description: 'Complete the CRUD operations and deploy the server',
  isCompleted: false,
  priority: 'high'
 },
 {
  title: 'Buy groceries',
  description: 'Pick up milk, eggs, and bread',
  isCompleted: false,
  priority: 'medium'
 },
 {
  title: 'Clean the house',
  description: 'Vacuum the floors and tidy up the living room',
  isCompleted: false,
  priority: 'low'
 },
 {
  title: 'Call mom',
  description: 'Catch up with mom and see how she\'s doing',
  isCompleted: false,
  priority: 'medium'
 },
 {
  title: 'Exercise for 30 minutes',
  description: 'Do a quick workout routine',
  isCompleted: false,
  priority: 'high'
 }
];

// Function to check and seed the database
export const checkAndSeedDatabase = async (taskCollection: Collection) => {
 try {
  // Check if collection has any documents
  const count = await taskCollection.countDocuments();

  if (count === 0) {
   // Collection is empty, proceed with seeding
   const result = await taskCollection.insertMany(seedData);
   console.log('🌱 Database seeded successfully!');
   console.log(`📝 Inserted ${result.insertedCount} documents`);
   return result;
  } else {
   console.log('💾 Database already contains data, skipping seed');
   return null;
  }
 } catch (error) {
  console.error('Seeding error:', error);
  throw error;
 }
};
