const path = require("path");
const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
    const apiKey = /*{Enter your weather api key} */ "ASDSADSADSA";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&"+apiKey+"&units=metric";
  https.get(url, function (response) {
    if(response.statusCode === 200) {
        response.on("data", (chunk) => {
            JSON.parse(chunk);
            const weatherData = JSON.parse(chunk);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const humidity = weatherData.main.humidity;
            const speed = weatherData.wind.speed;
      
            res.render("value", { cityName: query , specificTemp:temp,desc:weatherDesc,weatherIcon:icon,specificHumidity:humidity,specificSpeed:speed });
          });
    }
    else{
        res.sendFile(__dirname+"/index.html");
    }
    
  });
});

app.listen( process.env.PORT || port, function () {
  console.log("server running on port " + port);
});
