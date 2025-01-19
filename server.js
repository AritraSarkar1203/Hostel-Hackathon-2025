import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Database/connectDb.js';
import userRoutes from './Routes/userRoutes.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5500; 

app.use(express.json()); 

connectDB();

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
