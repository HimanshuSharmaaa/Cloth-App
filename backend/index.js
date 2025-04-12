const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env.local
const dotenvResult = dotenv.config({ path: ".env.local" });
if (dotenvResult.error) console.error("⚠️ Failed to load .env.local file");

const { connection, connectToPostgres, syncDatabase } = require("./db");

// To avoid CORS error while fetching the data from frontend through browser
app.use(cors());

// It parsed the body into json format.
app.use(express.json());

// urlencoded helps to parse the form-data
// We using extended: false, which limits nested object parsing.
// If you're using form data with deeply nested objects, change to true:
app.use(express.urlencoded({extended:true}));

// connect DB
connectToPostgres();
syncDatabase();

// server uploads folders on the server
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));// Serve images publicly

// Avaliable routes
app.use("/api/auth", require("./Routes/auth"));
app.use("/uploads", require("./Routes/upload"));
app.use("/offer", require("./Routes/offer"));
app.use("/order", require("./Routes/order"));
app.use("/cart", require("./Routes/cart"));
app.use("/api/product", require("./Routes/product"));
app.use("/api/sendEmail", require("./Routes/sendEmail"));
app.use("/api/adminLogin", require("./Routes/adminLogin"));

app.get("/", (req, res) => {
  res.send("Cloth-App server is live.");
});

// Sync DB with node server
connection.sync().then(() => console.log("db synced")).catch((err) => console.log("Errors: ", err));

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Page Not Found" });
});

app.listen(port, () => {
  console.log(`Cloth App Server run on http://localhost:${port}`);
});