import mongoose from 'mongoose';


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





let isConnected = false;

export const connecttodatabase = async () => {
  if (isConnected) return mongoose.connection.db;

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "sportle",
    });
    isConnected = true;
    console.log("MongoDB connected!");
    return mongoose.connection.db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw new Error("Database connection failed");
  }
};
