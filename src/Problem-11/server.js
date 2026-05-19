//server.js
import app from './app.js';
import connectDB from './db.js';

const PORT = 3000;

await connectDB();


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});