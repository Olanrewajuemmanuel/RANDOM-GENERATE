const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose")
const getRandomCode = require("./utils");
const Model = require("./dbModel");

require("dotenv").config();

const app = express();

// ===MIDDLEWARES==
app.use(morgan("dev"));
app.use(cors());
// ====

// Connect to DB
const uri = process.env.MongoURI; // Create a .env file and input MongoURI value
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected...");
});

// Get all random code

// getRandomCode(1, 1); // generate for first position
// getRandomCode(50, 2); // generate for second position
// getRandomCode(50, 3); // generate for third position
// getRandomCode(50, 4); // generate for fourth position
// getRandomCode(50, 5); // generate for fifth position
// getRandomCode(450, 6); // generate for sixth position
// getRandomCode(1000, 7); // generate for seventh position
// getRandomCode(1500, 8); // generate for eight position
// getRandomCode(1500, 9); // generate for ninth position
// getRandomCode(145349, 10); // generate for tenth position

// Routes
allowed_headers = ["Bearer+aabcd001", "Bearer+ddehg002", "Bearer+jjgtf003"]; // Allowed headers

app.post("/random-code/", async (req, res) => {
  const header = req.headers["x-auth-token"];
  // Check if token is sent in header

  if (!allowed_headers.includes(header))
    return res
      .status(403)
      .send("Wrong or No token authorization, access denied");

  const userId = req.query.userId

  // Create a random value on request
  await getRandomCode(1, 1, userId)
  
  // Retrieve user
  Model.findOne({ userId })
      .then(user => res.json({
        response: {
          user,
        }
      })).catch(err => res.status(400).send(err))
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log("Server's up!"));
