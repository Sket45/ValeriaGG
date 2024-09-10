import mongoose, { Connection } from "mongoose";

const MONGODB_VALERIA_URI = process.env.MONGODB_VALERIA_URI;

if (!MONGODB_VALERIA_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env file"
  );
}

let valeriaDbConnection: Connection | null = null;

const connectToValeriaDb = async (): Promise<Connection> => {
  if (valeriaDbConnection) {
    if (valeriaDbConnection.readyState >= 1) {
      console.log("Reusing existing connection to Valeria's database");
      return valeriaDbConnection;
    } else {
      console.log("Closing existing connection to Valeria's database");
    }
  }

  try {
    valeriaDbConnection = mongoose.createConnection(MONGODB_VALERIA_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    valeriaDbConnection.on("connected", () => {
      console.log("Connected to Valeria's database");
    });

    valeriaDbConnection.on("error", (error) => {
      console.error("Error connecting to Valeria's database: ");
    });

    await valeriaDbConnection.asPromise();
    return valeriaDbConnection;
  } catch (error: unknown) {
    console.error("Error connecting to Valeria's database:", error);
    throw new Error("Database conneciton failed");
  }
};

process.on("SIGINT", async () => {
  try {
    if (valeriaDbConnection) {
      await valeriaDbConnection.close();
      console.log("Connection to Valeria's database closed");
    }
    process.exit(0);
  } catch (error: unknown) {
    console.error("Error closing connection to Valeria's database: ");
    process.exit(1);
  }
});

export { connectToValeriaDb };
