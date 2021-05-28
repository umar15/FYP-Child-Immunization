const express = require("express"),
	cors = require("cors"),
	mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// db connection
const ATLAS_URI = process.env.ATLAS_URI;
mongoose.connect(ATLAS_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
	console.log(`Mongodb connected successfully`);
});

// routers
const childRouter = require("./routes/children");
const vaccineRouter = require("./routes/vaccines");
const campaignRouter = require("./routes/campaigns");

app.use("/children", childRouter);
app.use("/vaccines", vaccineRouter);
app.use("/campaigns", campaignRouter);

// start server
app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
