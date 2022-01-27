import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    role?: string;
    date?: Date;
    tickets?: string[];

    comparePassword(password: string): Promise<boolean>;
}
