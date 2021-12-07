import mongoose from "mongoose";

async function databaseSetup() {
    const isConnected: boolean = await connectToDatabase();
    if (!isConnected) {
        process.exit(1);
    }
}

async function connectToDatabase(): Promise<boolean> {
    try {
        await mongoose.connect(`${process.env.ST_APP_DB_URL}`);
        console.log("Database connection has been established");
        return true;
    } catch (error) {
        console.log("Error with database connection", error);
        return false;
    }
}

export { databaseSetup };
