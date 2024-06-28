require('dotenv').config({ path: './.env' }); // Ensure the correct path and file name
const app=require("./app")
const dbConnect = require("./db/connection");
dbConnect().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});
