const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const viewsPath = path.join(__dirname, "../Templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../Templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index", {
    Name: "Sadi Salvi Maruf",
    Title: "Weather App",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    Name: "Sadi Salvi Maruf",
    Title: "Help",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    Name: "Sadi Salvi Maruf",
    Title: "About Me",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) return res.send("Address is not sent!!");

  /* Geocode address */

  geocode(
    req.query.address,
    (error, { latitude, longitude, place_name } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          place_name,
          forecastData,
        });
      });
    }
  );

  /* End of Geocode address */
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    Title: "404 Error!!",
    errorMessage: "Help article not found",
    Name: "Sadi Salvi Maruf",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    Title: "404 Error!!",
    errorMessage: "Page is not found",
    Name: "Sadi Salvi Maruf",
  });
});

app.listen(3000, () => {
  console.log("server is up now");
});
