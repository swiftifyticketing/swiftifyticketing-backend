import Router from "koa-router";

export function registerRoutes() {
    const router = new Router();

    // AUTH ROUTES
    router.post("/");
    return router;
}
