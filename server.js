const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
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

letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
];
numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Possible combo is 26!

// helper function to get four values from letters array
function getValuesFromLetters() {
  let letterArray = [];
  for (let i = 0; i < 4; i++) {
    const randomValue = Math.floor(Math.random() * 10 + 5); // extend to 16
    letterArray.push(letters[randomValue]);
  }
  return letterArray;
}

// helper function to get three random values from numbers array
function getValuesFromNumbers() {
  let numberArray = [];
  for (let i = 0; i < 3; i++) {
    const randomValue = Math.floor(Math.random() * 10); // extend to 10
    numberArray.push(numbers[randomValue]);
  }
  return numberArray;
}

// helper function to get random code
function getRandomCode(numOfRoundsToBeGenerated, position) {
  for (let i = 0; i < numOfRoundsToBeGenerated; i++) {
    let letterValue = getValuesFromLetters();
    let numberValue = getValuesFromNumbers();
    letterValue = letterValue.concat(numberValue);

    let arrayToString = letterValue.toString(); // convert to a,b,c,d,1,2,3
    var newStr = arrayToString.replace(/,/g, ""); // remove commas

    // Save to DB
    new Model({
      random_code: newStr,
      position,
    })
      .save()
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  }
}

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

app.post("/random-code/", (req, res) => {
  const header = req.headers["x-auth-token"];
  // Check if token is sent in header

  if (!allowed_headers.includes(header))
    return res
      .status(403)
      .send("Wrong or No token authorization, access denied");

  let rand = Math.random();

  Model.findOne({ random_point: { $gte: rand } }) // Get a value in doc using random_point
    .then((doc) =>
      res.json({
        code: doc.random_code,
        position: doc.position,
      })
    )
    .catch((err) => res.status(400).send(err));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log("Server's up!"));
