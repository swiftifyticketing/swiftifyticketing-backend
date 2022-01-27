import Router from "koa-router";

import { Auth } from "../controllers/auth/auth";
import { verifyToken } from "../helpers/auth";
import { User } from "../controllers/user/user";

export function registerRoutes() {
    const router = new Router();

    // AUTH ROUTES
    router.post("/register", Auth.prototype.registerUser);
    router.post("/login", Auth.prototype.login);

    // USER ROUTES
    router.get("/user", verifyToken, User.prototype.getUser);

    return router;
}
