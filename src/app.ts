//import { databaseSetUp } from "./setupDatabase";
import { serverSetUp } from "./setupServer";
import dotenv from "dotenv";

async function init() {
    dotenv.config({});

    await serverSetUp();
    //await databaseSetUp();
}

init();
