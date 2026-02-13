/* uncomment this part */

const seriesBtn = document.getElementById("seriesGenerator");

seriesBtn.addEventListener("click", (event) => {
  /*
  document.getElementById("a").value returns string type data.
  since we will generate a series of numbers, we need to convert them to
  number, like Integer
  */
  const a = parseInt(document.getElementById("a").value);
  const d = parseInt(document.getElementById("d").value);
  const n = parseInt(document.getElementById("n").value);
  console.log(a, n, d);
  generateSeries(a, n, d);
});

const seriesAND = (a, n, d) => {
  let series = [];
  //console.log(series);
  for (let i = 0; i < n; i++) {
    const val = a + i * d;
    //console.log(typeof val);
    //console.log(val); --> you may uncomment these and check the output
    series.push(val);
  }
  //console.log(series);
  return series;
};

const generateSeries = (a, n, d) => {
  /* get another div and print all the intermediate results*/
  const divContainer = document.getElementById("step-by-step");
  divContainer.innerHTML = "";
  // create an unordered list
  const ulContainer = document.createElement("ul");
  //ul.setAttribute('id', 'myList');
  const values = seriesAND(a, n, d);
  console.log(values);
  values.forEach((value) => {
    // create an li element
    const li = document.createElement("li");
    li.textContent = value;
    ulContainer.appendChild(li);
  });
  divContainer.appendChild(ulContainer);

  console.log(ulContainer);
};
