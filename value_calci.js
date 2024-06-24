function calculateATR(globalData, period ) {
    const dates = globalData.map(entry => entry.Date);
    const opens = globalData.map(entry => entry.Open);
    const highs = globalData.map(entry => entry.High);
    const lows = globalData.map(entry => entry.Low);
    const closes = globalData.map(entry => entry.Close);
    
    const trueRanges = [];

    // Step 1: Calculate True Range for each period
    for (let i = 0; i < closes.length; i++) {
        const highLow = highs[i] - lows[i];
        const highClose = Math.abs(highs[i] - closes[i]);
        const lowClose = Math.abs(lows[i] - closes[i]);
        const trueRange = Math.max(highLow, highClose, lowClose);
        trueRanges.push(trueRange);
    }

    // Step 2: Calculate ATR for each period
    const atrValues = [];
    let sumTR = 0;

    for (let i = 0; i < period; i++) {
        sumTR += trueRanges[i];
    }

    atrValues.push({ Date: dates[period - 1], ATR: sumTR / period });

    for (let i = period; i < closes.length; i++) {
        sumTR = sumTR - trueRanges[i - period] + trueRanges[i];
        atrValues.push({ Date: dates[i], ATR: sumTR / period });
    }

    return atrValues;
}

//DCW calculation
function calculateDCW(globalData, period ) {
    const dates = globalData.map(entry => entry.Date);
    const highs = globalData.map(entry => entry.High);
    const lows = globalData.map(entry => entry.Low);

    const dcwValues = [];

    for (let i = period - 1; i < highs.length; i++) {
        const highestHigh = Math.max(...highs.slice(i - period + 1, i + 1));
        const lowestLow = Math.min(...lows.slice(i - period + 1, i + 1));
        const dcw = highestHigh - lowestLow;
        dcwValues.push({ Date: dates[i], DCW: dcw });
    }

    return dcwValues;
}

// DCW/ATR calculation
function calculateDCWATRRatio(dcwValues, atrValues) {
    const ratioValues = [];

    // Match dates between DCW and ATR data
    const matchedData = dcwValues.filter(dcwEntry => {
        return atrValues.some(atrEntry => atrEntry.Date === dcwEntry.Date);
    });

    // Calculate the ratio for matched dates
    for (let i = 0; i < matchedData.length; i++) {
        const date = matchedData[i].Date;
        const dcw = matchedData[i].DCW;
        const atr = atrValues.find(entry => entry.Date === date).ATR;

        const ratio = dcw / atr;
        ratioValues.push({ Date: date, Ratio: ratio });
    }

    return ratioValues;
}


function calculateNormalizedATR(globalData, atrValues) {
    const normalizedATRValues = [];

    for (let i = 0; i < globalData.length; i++) {
        const { Date, Open, Close } = globalData[i];
        const atrObj = atrValues.find(obj => obj.Date === Date);
        if (atrObj) {
            const atr = atrObj.ATR;
            const normalizedATR = Math.abs((Close - Open) / atr);
            normalizedATRValues.push({ Date, normalizedATR });
        } else {
            console.error(`ATR value not found for date: ${Date}`);
        }
    }

    return normalizedATRValues;
}

function calculateCloseOpenDifference(globalData) {
    const closeOpenDifferences = [];

    for (let i = 0; i < globalData.length; i++) {
        const { Date, Open, Close } = globalData[i];
        const difference = Math.abs(Close - Open);
        closeOpenDifferences.push({ Date, CloseOpenDifference: difference });
    }

    return closeOpenDifferences;
}


