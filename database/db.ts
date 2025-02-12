import mongoose from 'mongoose';


// let cached = (global as any).mongoose || { conn: null, promise: null };

// export const connectdatabase = async () => {
//   if (cached.conn) return cached.conn;

//   if(!MONGODB_URI) throw new Error('MONGODB_URI is missing');

//   cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
//     dbName: 'bookingo',
//     bufferCommands: false,
//   })

//   cached.conn = await cached.promise;

//   return cached.conn;
// }

export const connecttodatabase = async ()=>{

  try{
    await mongoose.connect( process.env.MONGODB_URI as string ,
     );

    console.log("mongo connected successfully");
  } catch(error) {
    console.log(error);
    process.exit(1);

 }

}