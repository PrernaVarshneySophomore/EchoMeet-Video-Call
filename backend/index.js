import express from "express";
import { createServer } from "node:http";


import mongoose from "mongoose";
import { connectToSocket } from "./src/controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";

const app = express();
const httpServer = createServer(app);
const io = connectToSocket(httpServer);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));


app.use("/api/v1/users", userRoutes);

const start = async () => {
    const connectionDb = await mongoose.connect("mongodb+srv://prernavarshney3008_db_user:dnH0CU8BaodSJCtr@cluster0.hyaszoo.mongodb.net/?appName=ZoomClone")
    
    console.log(`MONGO connected DB Host: ${connectionDb.connection.host}`);
    httpServer.listen(app.get("port"), () => {
        console.log("Listening to port 8000");
    });
}

start();