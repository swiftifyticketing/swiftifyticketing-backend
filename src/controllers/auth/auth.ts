// req, res, params like express
import { Context } from "koa";
import JWT from "jsonwebtoken";
import HTTP_STATUS from "http-status-codes";

import { UserModel } from "../../models/user/User.model";
import { firstLetterUppercase } from "../../helpers/helpers";

export class Auth {
    // Prototype functions

    // Register a user method prot
    public async registerUser(ctx: Context): Promise<void> {
        try {
            const { username, password, role } = ctx.request.body;
            const user = await UserModel.findOne({ username: firstLetterUppercase(username) });
            // If user is found return message and set null
            if (user) {
                ctx.response.status = HTTP_STATUS.CONFLICT;
                ctx.body = { message: "Credentials already exist" };
            } else {
                // If no user is found create one
                const body = {
                    username: firstLetterUppercase(username),
                    // Already hashed presave
                    // Same as password: password (short hand property)
                    password,
                    role,
                };

                const createdUser = await UserModel.create(body);
                const userData = {
                    id: createdUser._id,
                    username: createdUser.username,
                };
                const token = JWT.sign({ data: userData }, "testsecret", {});
                ctx.body = { message: "User created successfully", token };
            }
        } catch (error) {
            console.log(error);
            ctx.body = error;
        }
    }

    // Login a user method prot
    public async login(ctx: Context): Promise<void> {
        try {
            const { username, password } = ctx.request.body;
            const user = await UserModel.findOne({ username: firstLetterUppercase(username) });
            if (!user) {
                ctx.response.status = HTTP_STATUS.NOT_FOUND;
                ctx.body = { message: "Username not found" };
            } else {
                const isPasswordSame = await user.comparePassword(password);
                if (!isPasswordSame) {
                    ctx.response.status = HTTP_STATUS.INTERNAL_SERVER_ERROR;
                    ctx.body = { message: "Password is incorrect" };
                    return;
                }
                const userData = {
                    id: user._id,
                    username: user.username,
                };
                const token = JWT.sign({ data: userData }, "testsecret", {});
                ctx.body = { message: "Login successful", token };
            }
        } catch (error) {
            ctx.body = error;
        }
    }
}
