function calculateFromStake1() {
  const odds1 = parseFloat(document.getElementById("odds1").value) || 0;
  const stake1 = parseFloat(document.getElementById("stake1").value) || 0;
  const odds2 = parseFloat(document.getElementById("odds2").value) || 0;
  const stake2 = parseFloat(document.getElementById("stake2").value) || 0;
  calculateProfit(stake1, stake2, convertOdds(odds1), convertOdds(odds2));
}

function calculateFromStake2() {
  const odds1 = parseFloat(document.getElementById("odds1").value) || 0;
  const stake1 = parseFloat(document.getElementById("stake1").value) || 0;
  const odds2 = parseFloat(document.getElementById("odds2").value) || 0;
  const stake2 = parseFloat(document.getElementById("stake2").value) || 0;
  calculateProfit(stake1, stake2, convertOdds(odds1), convertOdds(odds2));
}

function convertOdds(americanOdds) {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1;
  } else if (americanOdds < 0) {
    return (100 / Math.abs(americanOdds)) + 1;
  } else {
    return 0;
  }
}

function calculateProfit(stake1, stake2, odds1, odds2) {
  const resultEl = document.getElementById("result");
  const circleEl = document.querySelector(".center-circle");

  // Potential returns
  let return1 = stake1 * odds1;
  let return2 = stake2 * odds2;

  // Net results if each side wins
  let profitIf1Wins = return1 - (stake1 + stake2);
  let profitIf2Wins = return2 - (stake1 + stake2);

  // Detect if arbitrage exists
  if (profitIf1Wins > 0 && profitIf2Wins > 0) {
    resultEl.textContent =
      `Arb Profit: $${Math.min(profitIf1Wins, profitIf2Wins).toFixed(2)}`;
    resultEl.style.color = "#4caf50";
    resultEl.classList.add("pulse-green");
    circleEl.classList.add("pulse-border-green");
  } else {
    resultEl.textContent =
      `No Arb (If 1 wins: $${profitIf1Wins.toFixed(2)}, If 2 wins: $${profitIf2Wins.toFixed(2)})`;
    resultEl.style.color = "#ff5252";
    resultEl.classList.remove("pulse-green");
    circleEl.classList.remove("pulse-border-green");
  }
}
