


const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get("https://qh-api.corp.hertshtengroup.com/api/ohlc/?products=CLH24&timeIntervals=1D", {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDI5OTIzODk5LCJpYXQiOjE3MTQ1NjM4OTksImp0aSI6ImVhYjdjZTk3ODEwZjRmNDlhZjliYTc1MmNkYThjMWNkIiwidXNlcl9pZCI6MTB9.8zO9oCl2eec1tdLNWA28ewJH_OAFlxxCsQoynyVgbQE'
      },
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });

    console.log(response.data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();

  

