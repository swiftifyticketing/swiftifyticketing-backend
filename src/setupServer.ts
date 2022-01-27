import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaCors from "koa2-cors";
import { Server } from "socket.io";
import http from "http";

import { registerRoutes } from "./routes/index";
import { global } from "./socket/global";

async function serverSetUp() {
    const server: Koa = new Koa();
    middleWares(server);
    await startServer(server);
}

function middleWares(server: Koa) {
    // Share content between frontend and backend
    server.use(bodyParser());
    server.use(koaCors());

    const routes = registerRoutes().routes();
    server.use(routes);
}

async function startServer(server: Koa) {
    try {
        const PORT = process.env.PORT || 5000;

        const httpServer = new http.Server(server.callback());
        const io = new Server(httpServer);
        global(io);
        httpServer.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { serverSetUp };
