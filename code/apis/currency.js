// Function to get user location and currency
function getUserCurrency() {
    // Make a request to IP geolocation API
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const countryName = data.country_name;
  
        // Make a request to REST Countries API
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
          .then(response => response.json())
          .then(data => {
            const currencyCode = Object.keys(data[0].currencies)[0];
  
            // Make a request to currency conversion API
            fetch('https://api.exchangerate-api.com/v4/latest/USD')
              .then(response => response.json())
              .then(data => {
                const conversionRate = data.rates[currencyCode];
                const baseCurrencyAmount1 = 10;
                const baseCurrencyAmount2 = 25;
                const convertedAmount1 = Math.ceil(baseCurrencyAmount1 * conversionRate);
                const convertedAmount2 = Math.ceil(baseCurrencyAmount2 * conversionRate);
  
                document.getElementById("headshot_price").textContent = `${convertedAmount1} ${currencyCode}`;
                document.getElementById("halfbody_price").textContent = `${convertedAmount2} ${currencyCode}`;
  
                console.log(`You are from ${countryName} and your currency is ${currencyCode}`);
                console.log(`${baseCurrencyAmount1}$ is equivalent to ${convertedAmount1} ${currencyCode}`);
                console.log(`${baseCurrencyAmount2}$ is equivalent to ${convertedAmount2} ${currencyCode}`);
              })
              .catch(error => {
                console.log('Error fetching currency conversion data:', error);
              });
          })
          .catch(error => {
            console.log('Error fetching country data:', error);
          });
      })
      .catch(error => {
        console.log('Error fetching user location data:', error);
      });
  }
  
  // Call the function
  getUserCurrency();
  