import express, {Request, Response} from 'express';
import cors from 'cors';
import {createConnection, getConnectionOptions} from "typeorm";
import { AddMessage, GetAllMessage} from './controller/messageController'
import bodyParser from 'body-parser';
import "reflect-metadata";
import './util/secret';

const app = express();

const init = async () => {

    const connectionOptions = {...(await getConnectionOptions()), password: process.env.POSTGRESQL_PASSWORD, database: process.env.POSTGRESQL_DATABASE, username: process.env.POSTGRESQL_USER}

    const connection = await createConnection(connectionOptions)

    app.set("port", process.env.PORT || 3000);
    app.use(cors())
    app.use(bodyParser.json())

    app.get('/', async function (req: Request, res: Response) {
        try {
            const messages = await GetAllMessage()
            res.json(messages)
        }catch(message) {
            res.status(400).send("Cannot get your message")
        }
    });

    app.post("/", async function(req: Request, res: Response) {
        if(!req.body.message || req.body.message === "")
            res.status(400).send("No message to add")
        else {
            try {
                const messageCreate = await AddMessage(req.body.message)
                res.status(201).json(messageCreate)
            }catch(message) {
                res.status(400).send("An error occured")
            }
        }
    })

    const server = app.listen(app.get("port"), () => {
        console.log(
            "  App is running at http://localhost:%d in %s mode",
            app.get("port"),
            app.get("env")
        );
        console.log("  Press CTRL-C to stop\n");
    });
}

init()

