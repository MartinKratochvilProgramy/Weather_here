if ("geolocation" in navigator) {
  console.log("geolocation available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // this sends data to the server
    data = { lat, lon };
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    
    response = await fetch("/weather", options);
    json = await response.json();
    console.log(json);

    document.getElementById('location').innerText = json.data[0].city_name;
    document.getElementById('temperature').innerText = json.minutely[0].temp + '°C';
    document.getElementById('wind-spd').innerText = json.data[0].wind_spd.toFixed(1) + ' m/s';

    
  });
} else {
  console.log("geolocation not available");
}

