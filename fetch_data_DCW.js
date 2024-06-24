function getDaysBetweenDates(startDateInput, endDateInput) {
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const timeDifference = endDate - startDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return daysDifference;
  }
  
async function fetch_Data_for_dcw(startDateInput, endDateInput, productValue,DCW_periods ) {
    try {
        let products = productValue;
        console.log(productValue);
        console.log(products);
        console.log(startDateInput);
        console.log(endDateInput);
        const response = await fetch(`https://qh-api.corp.hertshtengroup.com/api/ohlc/?products=${products}&timeIntervals=1D`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoyMDI5OTIzODk5LCJpYXQiOjE3MTQ1NjM4OTksImp0aSI6ImVhYjdjZTk3ODEwZjRmNDlhZjliYTc1MmNkYThjMWNkIiwidXNlcl9pZCI6MTB9.8zO9oCl2eec1tdLNWA28ewJH_OAFlxxCsQoynyVgbQE'
            }
        });
  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        let period = DCW_periods;
        // Extract High and Open data for the chart
        const fetch_Data = data[`${products}_1D`].DATA.reduce((acc, entry) => {
            const timestamp = entry[0] * 1000;
            const date = new Date(timestamp);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            let extra_delete = 10;
            if (25 < period && period <= 50) {
                extra_delete = 15;    
            }      
            else if (50 < period && period <= 80) {
                extra_delete = 25;    
            }
             else if (80 < period && period <= 100) {
                  extra_delete = 35;
              }
               else if (100 < period && period <= 150) {
                      extra_delete = 55;
                  }
                  
  
            const startDate = new Date(startDateInput);
            startDate.setDate(startDate.getDate() - period - extra_delete);
            const endDate = new Date(endDateInput);
  
            if (date >= startDate && date <= endDate) {
                acc.push({
                    Date: formattedDate,
                    Open: entry[1],
                    High: entry[2],
                    Low: entry[3],
                    Close: entry[4]
                });
            }
            return acc;
        }, []);
  
        // If fetch_Data is less than period, fetch additional data points before startDate
        const missingDataCount = period - fetch_Data.length;
        if (missingDataCount > 0) {
            const additionalData = data[`${products}_1D`].DATA.reduceRight((acc, entry) => {
                const timestamp = entry[0] * 1000;
                const date = new Date(timestamp);
  
                const startDate = new Date(startDateInput);
                startDate.setDate(startDate.getDate() - period - 25);
  
                if (date < startDate && acc.length < missingDataCount) {
                    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                    acc.push({
                        Date: formattedDate,
                        Open: entry[1],
                        High: entry[2],
                        Low: entry[3],
                        Close: entry[4]
                    });
                }
                return acc;
            }, []);
  
            fetch_Data.unshift(...additionalData);
        }
  
        fetch_Data.reverse();
        console.log(fetch_Data);
        return fetch_Data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }
  
  