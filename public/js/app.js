const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (location.length !== 0) {
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch("/weather?address=" + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent =
            "Can't fetch weather info. please try again!!";
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.place_name;
          messageTwo.textContent = data.forecastData;
        }
      });
    });
  } else {
    messageOne.textContent = "you have to insert an address first";
    messageTwo.textContent = "";
  }
});
