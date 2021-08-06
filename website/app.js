/* Global Variables */
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const apiKey = "bc2a6744b6b0dd62f6d98596b351ad21";
document.getElementById("generate").addEventListener("click", performAction);

const postData = async (url = "", projectData = {}) => {
  await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
};

async function performAction(e) {
  let zipCode = document.querySelector("#zip").value;
  if (!zipCode) {
    alert("Please enter a valid Zip Code");
  } else {
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=${apiKey}&units=metric`;
    let userResponse = document.querySelector("#feelings").value;
    getWeather(url)
      .then(function (data) {
        // Add data
        if (data.cod === "404") {
          alert("Please enter a valid Zip Code");
        } else {
          let temp = data.main.temp;
          postData("/postData", { temp, newDate, userResponse });
        }
      })
      .then(updateUI);
  }
}
const getWeather = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    // appropriately handle the error
    console.log("error", error);
  }
};
const updateUI = async () => {
  const response = await fetch("/getData", {
    method: "GET",
    credentials: "same-origin",
  });
  try {
    const allData = await response.json();
    document.getElementById("date").innerHTML = allData.newDate;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.userResponse;
  } catch (error) {
    console.log("error", error);
  }
};
