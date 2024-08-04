import express from 'express';
const app = express();
import mongoose from 'mongoose';
const port = 3000;
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
let cors = require('cors')
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// mongoDB connect
mongoose.connect(process.env.MONGO_URL as string, { dbName: "courses" })
.then(() => console.log("Connected to database"))
.catch(() => console.log("Not connected to db"));

