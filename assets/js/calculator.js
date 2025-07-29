// calculator.js

function americanToDecimal(odds) {
  odds = parseFloat(odds);
  if (isNaN(odds)) return 0;
  if (odds > 0) {
    return (odds / 100) + 1;
  } else {
    return (100 / Math.abs(odds)) + 1;
  }
}

function calculateFromStake1() {
  const odds1 = document.getElementById("odds1").value;
  const stake1 = document.getElementById("stake1").value;
  const odds2 = document.getElementById("odds2").value;
  const stake2 = document.getElementById("stake2").value;

  runCalculation(odds1, stake1, odds2, stake2);
}

function calculateFromStake2() {
  const odds1 = document.getElementById("odds1").value;
  const stake1 = document.getElementById("stake1").value;
  const odds2 = document.getElementById("odds2").value;
  const stake2 = document.getElementById("stake2").value;

  runCalculation(odds1, stake1, odds2, stake2);
}

function runCalculation(odds1, stake1, odds2, stake2) {
  const dec1 = americanToDecimal(odds1);
  const dec2 = americanToDecimal(odds2);

  stake1 = parseFloat(stake1) || 0;
  stake2 = parseFloat(stake2) || 0;

  const payout1 = stake1 * dec1;
  const payout2 = stake2 * dec2;

  const totalStake = stake1 + stake2;
  const profit1 = payout1 - totalStake;
  const profit2 = payout2 - totalStake;

  let resultText = "";
  let isArb = false;

  if (stake1 > 0 && stake2 > 0) {
    if (profit1 > 0 && profit2 > 0) {
      resultText = `Arb! Guaranteed Profit: $${Math.min(profit1, profit2).toFixed(2)}`;
      isArb = true;
    } else {
      resultText = `No Arb. Profit 1: $${profit1.toFixed(2)} | Profit 2: $${profit2.toFixed(2)}`;
    }
  } else {
    resultText = "Enter stakes to calculate";
  }

  updateResult(resultText, isArb);
}

function updateResult(message, isArb) {
  const resultEl = document.getElementById("result");
  const circleEl = document.querySelector(".center-circle");

  // ✅ Only trigger pulse if the text actually changes
  if (resultEl.textContent !== message) {
    resultEl.textContent = message;

    if (isArb) {
      resultEl.style.color = "#00ff66"; // money green
    } else {
      resultEl.style.color = "#ff4444"; // red
    }

    // 🔥 Trigger pulse only on change
    circleEl.classList.remove("pulse");
    void circleEl.offsetWidth; // reflow to restart animation
    circleEl.classList.add("pulse");
  }
}
