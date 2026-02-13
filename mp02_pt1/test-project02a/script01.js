// step 0: declare a comment
/*
 step 1: declare multiline comment...
*/
//step 2: compile and run command on terminal: node script01.js

// step 3: declare variables:
/*use ketword: let or var (var is kind of outdated)
const is used to store constant values 
*/
/*
let x = 10;
let y = "20";
console.log(x); // like print function in C/C++/Python/Java
console.log("2x: ", x + x);
console.log(y);
console.log(x + y); //concat
*/

// step 4: declare a const
/*
const m = 20;
m = m + 10; // error, since we are trying to change the value of a const
console.log(m);
*/

// step 5: deal with an array and iteration (for loop)
/*
let good = [10, 20, -50, 300, -18];
let allGood = 0;
for (i = 0; i < good.length; i++) {
  allGood += good[i];
}
console.log("All Good: ", allGood);
*/

/*
step 6: if statement: conditional
*/
/*
if (allGood < 100) {
  console.log("Not good at all");
} else if (allGood >= 100 && allGood < 500) {
  console.log("Okay! Not great");
} else {
  console.log("All great");
}*/

// step 7: traditional way of defining a function
/*
function sum(a, b) {
  return a + b;
}*/

// console.log('Sum of 10 and 30 is: ' + sum(10, 30));

// step 8: anonymous / arrow function expression
/*
let sum = (a, b) => a + b; // arrow function expression
console.log(sum(12, 15));

let product = (a, b) => a * b; //arrow function expression
console.log(product(12, 5));
*/

/*
step 9: declaring objects in JS
*/
// let p = { name: "Germany", foul: 10, cardY: 1, cardR: 1 };
// let q = { name: "France", foul: 10, cardY: 2, cardR: 1 };
// propertyType function takes a team object as input and
// checks if the property types are as expected or not.

// function propertyType(team) {
//   if (
//     typeof team.name === "string" &&
//     typeof team.foul === "number" &&
//     typeof team.cardY === "number" &&
//     typeof team.cardR === "number"
//   )
//     return true;
//   else return false;
// }
/* bestTeam function checks the team inputs (valid format) first,
then it sums up the foul, yellow card and red card properties of each team and 
declares the winner (team who has less fouls+yellow cards + red cards)
*/
// function bestTeam(team1, team2) {
//   // You have to write your code here
//   if (typeof team1 !== "object" || typeof team2 !== "object") {
//     return "Invalid";
//   } else if (!propertyType(team1) || !propertyType(team2)) {
//     return "Invalid";
//   } else {
//     let team1Count = team1.foul + team1.cardR + team1.cardY;
//     let team2Count = team2.foul + team2.cardR + team2.cardY;
//     if (team1Count < team2Count) return team1.name;
//     else if (team1Count > team2Count) return team2.name;
//     else return "Tie";
//   }
// }
