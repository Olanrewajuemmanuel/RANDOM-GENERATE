const mongoose = require("mongoose");
const Model = require("./dbModel");

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
function getRandomCode(numOfRoundsToBeGenerated, position, userId) {
  for (let i = 0; i < numOfRoundsToBeGenerated; i++) {
    let letterValue = getValuesFromLetters();
    let numberValue = getValuesFromNumbers();
    letterValue = letterValue.concat(numberValue);

    let arrayToString = letterValue.toString(); // convert to a,b,c,d,1,2,3
    var newStr = arrayToString.replace(/,/g, ""); // remove commas

    // Check if user exists before saving,
    const existingUser = Model.find({ userId });
    if (!existingUser) {
      console.log("USER ALREADY EXISTS, CODE HAS BEEN GIVEN");
      return 
    }

    // Save to DB
    new Model({
      random_code: newStr,
      position,
      userId,
    })
      .save()
      .then((doc) =>{ console.log(doc)})
      .catch((err) => {console.log(err)});
  }
}

module.exports = getRandomCode;
