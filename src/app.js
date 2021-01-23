const path = require("path");
const express = require("express");
const hbs = require("hbs");
// const geocode = require("./utils/geocode");
const chalk = require("chalk");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log());

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../Templates/views");
const partialsPath = path.join(__dirname, "../Templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vivek Singha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Vivek Singha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "this is some helpful text",
    title: "Help",
    name: "Vivek Singha",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "no address provided",
    });
  }
  forecast(req.query.address, (err, forecastData, location) => {
    if (err) {
      return res.send(err);
    }
    res.send({
      address: req.query.address,
      forecast: forecastData,
      location: location,
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    text: "Help article not found",
    name: "Vivek Singha",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    text: "Page not found",
    name: "Vivek Singha",
  });
});

app.listen(port, () => {
  console.log("Server is up on port ". + port + '.');
});
