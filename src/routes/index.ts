import Router from "koa-router";

import { Auth } from "../controllers/auth/auth";
import { Ticket } from "../controllers/ticket/ticket";
import { verifyToken } from "../helpers/auth";
import { User } from "../controllers/user/user";

export function registerRoutes() {
    const router = new Router();

    // Define routes

    // AUTH ROUTES
    router.post("/register", Auth.prototype.registerUser);
    router.post("/login", Auth.prototype.login);

    // USER ROUTES
    router.get("/user", verifyToken, User.prototype.getUser);

    // TICKET ROUTES
    router.get("/tickets", verifyToken, Ticket.prototype.getAllTickets);
    router.post("/tickets/add", verifyToken, Ticket.prototype.addTicket);
    router.put("/tickets/:id", verifyToken, Ticket.prototype.editTicket);
    router.put("/tickets/mark-ticket/:_id", verifyToken, Ticket.prototype.closeTicket);
    router.delete("/tickets/:_id", verifyToken, Ticket.prototype.deleteTicket);

    return router;
}
