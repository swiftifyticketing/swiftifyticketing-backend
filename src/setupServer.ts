import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaCors from "koa2-cors";

async function serverSetUp() {
    const server: Koa = new Koa();
    middleWares(server);
    await startServer(server);
}

function middleWares(server: Koa) {
    // Share content between frontend and backend
    server.use(bodyParser());
    server.use(koaCors());
}

async function startServer(server: Koa) {
    try {
        const serverPort = 5000;

        const serverStarted: Promise<void> = new Promise((resolve) => {
            server.listen(serverPort, resolve);
        });

        await serverStarted;
        console.log(`Server running on port ${serverPort}`);
    } catch (error) {
        console.log(error);
        return error;
    }
}

export { serverSetUp };
