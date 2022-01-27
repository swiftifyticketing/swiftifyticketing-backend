import mongoose from "mongoose";

import { IUser } from "../../interface/User.interface";
import { userSchema } from "./User.schema";

const userModel: mongoose.Model<IUser> = mongoose.model<IUser>("User", userSchema, "User");
export { userModel as UserModel };
