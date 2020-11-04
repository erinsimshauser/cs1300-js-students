var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=Gd_PNlApN82J0-xRFu7d3uvp5rnW1QGdFLoWzWQ_UBY";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => { //promise takes in 2 functions as parameters, code inside will run async
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then( //this code is run when resolve is called
  (request) =>
    (request.onload = request.onerror = function () {
      handleResponse(request.response);
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const handleResponse = (requestResponse) => {
  const jsonified = JSON.parse(requestResponse);
  const plantsArray = jsonified.data;
  console.log(plantsArray);

  const plantsFilter = plantsArray.filter((arrayItem) => {
    return arrayItem.family_common_name=="Beech family";
  })

  plantsFilter.map((arrayItem) => {
    const wrapper = document.createElement("div");
    const name = document.createElement("h2");
    const img = document.createElement("img");
    wrapper.setAttribute("margin", "5%");
    name.innerText = arrayItem.common_name;
    img.setAttribute("src", arrayItem.image_url);
    img.setAttribute("width", 300);
    wrapper.appendChild(name)
    wrapper.appendChild(img);
    document.getElementById("plants").appendChild(wrapper);
  });
}


// const isOne = (number) => number == 1 ? console.log("is one") : console.log("not one"); //ternary