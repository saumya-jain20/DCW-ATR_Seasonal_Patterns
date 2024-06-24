// create a line chart
function createLineChart(globalData) {
    
const dates = globalData.map(entry => entry.Date);
const opens = globalData.map(entry => entry.Open);


// Define data trace
const xArray = globalData.map(entry => entry.Date);
const yArray =globalData.map(entry => entry.Open);

// Define Data
const data = [{
  x: xArray,
  y: yArray,
  mode: "lines",
  type: "scatter"
}];

// Define Layout
const layout = {
    title: "Open Prices",
    xaxis: {
        title: "Date"
    },
    yaxis: {
        title: "Open Price"
    }
  
};

// Display using Plotly
Plotly.newPlot("C1", data, layout);
console.log("dates", dates);
console.log("opens", opens);
  }
  function createbarChart(DCW_ATR) {
    
    const xArray = DCW_ATR.map(entry => entry.Date);
const yArray =DCW_ATR.map(entry => entry.Ratio);

const data2 = [{
  x:xArray,
  y:yArray,
  type:"bar",
  orientation:"v",
  marker: {color:"rgba(0,0,255,0.6)"}
}];

const layout2 = {title:"DCW/ATR Ratio",};

Plotly.newPlot("C2", data2, layout2);
      }
 