import dotenv from "dotenv"
dotenv.config();
import Client from "./source/structures/Client.js"
const client = new Client(process.env.token);
client.eLoad();
client.cLoad();
client.login();