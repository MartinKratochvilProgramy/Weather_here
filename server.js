const express = require("express");
const fetch = require("node-fetch");
require('dotenv').config()

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));


app.post("/weather", async (request, response) => {
  // get location latitude and longitude and send back info about weather at that location

  const lat = request.body.lat;
  const lon = request.body.lon;

  const weather_api_key = process.env.API_KEY;
  const weather_api_url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weather_api_key}&include=minutely`;
  const weather_response = await fetch(weather_api_url); 
  const weather_data = await weather_response.json();
  
  response.json(weather_data);
});

