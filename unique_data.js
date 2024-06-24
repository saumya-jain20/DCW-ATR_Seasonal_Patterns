const fs = require('fs');
const json2xls = require('json2xls');

// Function to extract unique keys from JSON data
function extractKeys(jsonData) {
    const keys = new Set();
    jsonData.forEach(obj => {
        Object.keys(obj).forEach(key => keys.add(key));
    });
    return Array.from(keys);
}

// Function to create Excel sheet
function createExcel(jsonData, keys) {
    const xlsData = [];
    // Push header row with keys
    xlsData.push(keys);

    // Push data rows
    jsonData.forEach(obj => {
        const rowData = [];
        keys.forEach(key => {
            rowData.push(obj[key] || ''); // Push value or empty string if key doesn't exist
        });
        xlsData.push(rowData);
    });

    return json2xls(xlsData);
}

// Main function
function main() {
    const filePath = 'data.json'; // Path to your JSON file
    const keys = ["ttProductCode", "primaryITM"]; // Keys to consider

    // Read JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);
            const uniqueKeys = extractKeys(jsonData).filter(key => keys.includes(key));
            const xls = createExcel(jsonData, uniqueKeys);

            fs.writeFileSync('output.xlsx', xls, 'binary');
            console.log('Excel file generated successfully!');
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
}

// Run main function
main();
