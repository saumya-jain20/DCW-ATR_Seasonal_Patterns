// Purpose: This file contains the functions to create different types of charts using Plotly.js library
//          and to remove the chart from the container.



// create a bar chart
function createBarChart(

  XRR,
  YRR,
  clickCount,
  Xaxis_name,
  Yaxis_name,
  startDateInput,
  endDateInput
) {
 
    const xArray1= XRR;
    const yArray1= YRR;
    // const xArray1= [2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const yArray1= [1, 2, 3, 4, 5, 6, 7, 8, 9];
     
    
    console.log("xArray1", xArray1);

    const colors = yArray1.map((value) =>
      value >= 0 ? "rgb(0, 102, 0)" : "rgb(179, 36, 0)"
    );

    const data1 = [
      {
        x: xArray1,
        y: yArray1,
        type: "bar",
        orientation: "v",
        marker: { color: colors },
      },
    ];
    const layout1 = { 
      title: Yaxis_name + "  vs  " + Xaxis_name + "\n product: " + productValue + "  ",
  };
  

    Plotly.newPlot("C" + clickCount, data1, layout1);

    

  
}

// create a scatter chart   ,

function createScatterChart(
  XRR,
        YRR,
  clickCount,
  Xaxis_name,
  Yaxis_name,
  startDateInput,
  endDateInput
) {
  // const xArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const yArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const xArray2 = XRR;
  const yArray2 = YRR;

  const colors = yArray2.map((value) =>
    value >= 0 ? "rgb(0, 102, 0)" : "rgb(179, 36, 0)"
  );

  const data2 = [
    {
      x: xArray2,
      y: yArray2,
      mode: "markers",
      marker: { color: colors },
    },
  ];

  const layout2 = {
    title: Yaxis_name + "  vs  " + Xaxis_name + "  " + "\n product: " + productValue + "  ",
  };

  Plotly.newPlot("C" + clickCount, data2, layout2);
}

// create a line chart
function createLineChart(
  XRR,
        YRR,
  clickCount,
  Xaxis_name,
  Yaxis_name,
  startDateInput,
  endDateInput
) {
  const xArray3 = XRR;
  const yArray3 = YRR;
  // const xArray3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const yArray3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const data3 = [
    {
      x: xArray3,
      y: yArray3,
      mode: "lines",
      line: {
        color: "rgb(133, 51, 255)",
      },
    },
  ];

  const layout3 = {
    title: Yaxis_name + "  vs  " + Xaxis_name + "  " + "\n product: " + productValue + "  ",
  };

  Plotly.newPlot("C" + clickCount, data3, layout3);
}

// create a pie chart
function createPieChart(
  XRR,
        YRR,
  clickCount,
  Xaxis_name,
  Yaxis_name,
  startDateInput,
  endDateInput
) {
  const xArray4 = XRR;
  const yArray4 = YRR;
  // const xArray4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const yArray4 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const layout4 = { title: Yaxis_name + "  vs  " + Xaxis_name + "  " + "\n product: " + productValue + "  " };

  const data4 = [{ labels: xArray4, values: yArray4, hole: 0.4, type: "pie" }];

  Plotly.newPlot("C" + clickCount, data4, layout4);
}

// create a stacked bar chart
function createStackChart(
  XRR,
        YRR,
  clickCount,
  Xaxis_name,
  Yaxis_name,
  startDateInput,
  endDateInput
) {
  const xArray5 = XRR;
  const yArray5 = YRR;
  // const xArray5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // const yArray5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  function countValuesInRange(xArray5, yArray5) {
    const counts = {};
    xArray5.forEach((x, index) => {
      const range = Math.floor(x);
      const value = yArray5[index];
      if (!counts[range]) {
        counts[range] = { positive: 0, negative: 0 };
      }
      if (value >= 0) {
        counts[range].positive++;
      } else {
        counts[range].negative++;
      }
    });
    return counts;
  }

  const counts = countValuesInRange(xArray5, yArray5);

  // Prepare data for the plot
  const data = [
    {
      x: Object.keys(counts),
      y: Object.values(counts).map(({ positive }) => positive),
      type: "bar",
      name: "Days of Profit",
      marker: {
        color: "rgb(50, 171, 96)",
      },
    },
    {
      x: Object.keys(counts),
      y: Object.values(counts).map(({ negative }) => negative),
      type: "bar",
      name: "Days of Loss",
      marker: {
        color: "rgb(219, 64, 82)",
      },
    },
  ];

  // Set layout options
  const layout5 = {
    barmode: "stack",
    title: "Stacked Bar Graph for " + Yaxis_name + " vs " + Xaxis_name + "  " + "\n product: " + productValue + "  ",
    xaxis: {
      title: "Range of " + Xaxis_name + " values ",
    },
    yaxis: {
      title: "Count",
    },
  };

  Plotly.newPlot("C" + clickCount, data, layout5);
}

// function to remove the chart from container
function removeChart(clickCount) {
  const chartContainer = (document.getElementById("C" + clickCount).innerHTML =
    "");
  if (chartContainer) {
    Plotly.purge(chartContainer);
  } else {
    console.log("Chart container not found.");
  }
}


let containerNumber;

function assignVariable(number) {
    let containerNumber = number;
    previous_no--;
    removeChart(containerNumber);
    clickCount = containerNumber-1;
    console.log("clickCount extra", clickCount);  
    console.log("Container number assigned:", containerNumber);
}
