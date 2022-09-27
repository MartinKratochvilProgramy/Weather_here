if ("geolocation" in navigator) {

  navigator.geolocation.getCurrentPosition(async (position) => {
    // user allows to get location

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // send data to server
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

    // update output card
    document.getElementById("location").innerText = json.data[0].city_name;
    document.getElementById("temperature").innerText = json.minutely[0].temp + "°C";
    document.getElementById("wind-spd").innerText = json.data[0].wind_spd.toFixed(1) + " m/s";

    
  }, function() {
    // user does not allow to get location - change card shadow to red
    document.getElementById("location").innerText = "Unavailable";
    document.getElementById("card").className = "card-error";
  });
} else {
  window.alert("Geolocation missing!");
}

