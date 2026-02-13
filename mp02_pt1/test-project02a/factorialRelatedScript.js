//let sum = (a, b) => a + b; // arrow functions
//console.log(sum(12, 15));

//let product = (a, b) => a * b; //arrow
//console.log(product(12, 5));

//let resultSum = sum(12, 22);
//let resultProd = product(12, 22);

//let h1Sum = document.getElementById("sumData");
//if (h1Sum) h1Sum.textContent = "Sum of 12 and 22 is: " + resultSum;

//let h1Prod = document.getElementById("prodData");
//if (h1Prod) h1Prod.textContent = "Product of 12 and 22 is: " + resultProd;

const factorial = (n) => {
  let prod = 1;
  for (i = 2; i <= n; i++) prod *= i;
  return prod;
};

function getResult() {
  const inputElement = document.getElementById("numberEntry");

  const inputValue = inputElement.value;

  const outputElement = document.getElementById("output");
  outputElement.textContent = factorial(inputValue);
  console.log(inputValue);
}
