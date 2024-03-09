const mongoose = require("mongoose");
const connectionString: string = process.env.MONGO_CNN_STR!;

// Connection to Mongo Atlas
const db = async (): Promise<void> => {
  try {
    if (!connectionString) {
      throw new Error("⛔ [DB] MongoDB connection string not provided.");
    }
    await mongoose.connect(connectionString);
    console.log('✅ [DB] conection success')
  } catch (error) {
    console.error("⛔ [DB] Connection Error -->", (error as Error).message);
    process.exit(1);
  }
};

export default db;