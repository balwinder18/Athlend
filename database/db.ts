// import mongoose from 'mongoose';


// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connecttodatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(process.env.MONGODB_URI, {
//     dbName: 'sportle',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }

import mongoose from 'mongoose';

// Properly typed cache interface
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Properly extend global object
declare global {
  var mongoose: MongooseCache | undefined;
}

// Initialize cache with proper typing
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connecttodatabase = async () => {
  if (cached.conn) {
    console.log(" Using existing connection");
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing');
  }

  if (!cached.promise) {
    console.log("Creating new connection...");
    
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'sportle',
      bufferCommands: false,
      
      // Increase pool size and add better timeout handling
      maxPoolSize: 50,                    // More connections available
      minPoolSize: 5,                     // Keep minimum connections alive
      serverSelectionTimeoutMS: 10000,    // Wait longer for server selection
      socketTimeoutMS: 45000,             // Socket timeout
      maxIdleTimeMS: 30000,               // Close idle connections after 30s
      heartbeatFrequencyMS: 10000,        // Check connection health
      
      // Critical for preventing hangs
      connectTimeoutMS: 30000,            // Connection establishment timeout
      waitQueueTimeoutMS: 5000,
    }).then((mongoose) => {
      console.log(" MongoDB connected!");
      return mongoose;
    }).catch(err => {
      console.error(" Connection failed:", err);
      cached.promise = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
    global.mongoose = cached; // Ensure global reference is updated
    return cached.conn;
  } catch (error) {
    console.error("Connection error:", error);
    cached.promise = null;
    throw error;
  }
};