const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")

const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.hb9czsm.mongodb.net/calendar-app-api?retryWrites=true&w=majority&appName=Zuitt-Bootcamp",
{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas!"));

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

if(require.main === module){
	app.listen(process.env.PORT,() => {
		console.log(`API is now online on port ${process.env.PORT}`)
	});
}

module.exports = app;
