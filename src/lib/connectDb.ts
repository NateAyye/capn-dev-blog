import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const connectMongo = async () => {
  console.log(connectionString);
  try {
    const mongo = await mongoose.connect(connectionString, {
      dbName: 'test',
    });
    return mongo;
  } catch (error) {
    console.log('error connecting to MongoDB: ', error);
  }
};

export default connectMongo;
