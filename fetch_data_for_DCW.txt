//Function to fetch data and process it
async function fetch_Data_for_dcw(startDateInput, endDateInput, productValue) {
    try {
        let products = productValue;

        // Fetch the JSON data from the URL
        const response = await fetch(`https://qh-charts.corp.hertshtengroup.com/api/get-ohlc-data/?products=${products}&timeIntervals=1D`);
        
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parse response as text
        const data = await response.text();

        // Replace "NaN" with "0" in the JSON data
        const replacedData = data.replace(/NaN/g, "0");
        
        // Parse the modified JSON string back to array of arrays format
        const parsedData = JSON.parse("[" + replacedData + "]");

        // Extract High and Open data for the chart
        const fetch_Data = parsedData[0][`${products}_1D`].DATA.reduce((acc, entry) => {
            // Convert Unix timestamp to milliseconds
            const timestamp = entry[0] * 1000;
            // Create a new Date object from the timestamp
            const date = new Date(timestamp);
            // Format the date as "mm/dd/yyyy"
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            // Check if the date falls within the desired range (start date - 50 days to end date)
            const startDate = new Date(`${startDateInput}`);
            startDate.setDate(startDate.getDate() - 55); // Adjust start date by subtracting 50 days
            const endDate = new Date(`${endDateInput}`);
            
            if (date >= startDate && date <= endDate) {
                acc.push({
                    Date: formattedDate,  // Date value
                    Open: entry[1], // Open value
                    High: entry[2], // High value
                    Low: entry[3], // Low value
                    Close: entry[4], // Close value
                   
                });
            }
            return acc;
        }, []);
        
        // Reverse the order of fetch_Data array
        fetch_Data.reverse();
        
        // Store fetched data in global array
        globalData = fetch_Data;
        
        // Return the processed data
        return globalData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error
    }
}
