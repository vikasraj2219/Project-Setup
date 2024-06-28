const mongoose = require("mongoose");
const { DB_NAME } = require("../constants"); // Assuming DB_NAME is exported from ../constants

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`\n MongoDB connected !!`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

module.exports = connectDB;
