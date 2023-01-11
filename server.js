const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

// Turn array into json
function arrayToJson(arr) {
    const jsonArr = arr.slice(0, -1).map(([roll, subtotal]) => ({ roll, subtotal }));
    jsonArr.push({ total: arr[arr.length - 1] });
    return jsonArr;
}

app.get('/rolldice', async (req, res) => {
    // Request parameters
    let dice = Math.min(Number(req.query.dice), 1000);
    let sides = Math.min(Number(req.query.sides), 1000);
    let rolls = Math.min(Number(req.query.rolls), 1000);
    console.log(`Request received. Dice: ${dice}, sides: ${sides}, times: ${rolls}.`)

    // Limit calculations
    dice = Math.min(dice, 1000)
    sides = Math.min(sides, 1000)
    rolls = Math.min(rolls, 1000)

    // Variable definitions
    let totalResults = [];
    let totalSum = 0;
    
    // Roll the dice
    for (let i = 0; i < rolls; i++) {
        let rollResults = []
        for (let j = 0; j < dice; j++) {
            let roll = Math.floor(Math.random() * sides) + 1;
            rollResults.push(roll);
        }

        let sum = rollResults.reduce((acc, cur) => acc + cur, 0);

        totalSum += sum;
        totalResults.push([rollResults, sum]);
    }
    totalResults.push(totalSum);
    const finalResult = arrayToJson(totalResults);

    // Return response
    res.json({ result: finalResult });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});