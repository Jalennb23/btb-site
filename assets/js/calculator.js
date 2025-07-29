// calculator.js

// ===== Calculator Logic =====

// Convert American odds to decimal odds
function americanToDecimal(odds) {
  odds = parseFloat(odds);
  if (isNaN(odds) || odds === 0) return null;
  if (odds > 0) return 1 + odds / 100;
  return 1 + 100 / Math.abs(odds);
}

// Calculate profit and adjust other side dynamically
function calculateFromStake1() {
  let odds1 = americanToDecimal(document.getElementById("odds1").value || document.getElementById("odds1Display").textContent);
  let odds2 = americanToDecimal(document.getElementById("odds2").value || document.getElementById("odds2Display").textContent);
  let stake1 = parseFloat(document.getElementById("stake1").value) || 0;

  if (!odds1 || !odds2 || stake1 <= 0) {
    document.getElementById("result").textContent = "Profit: $0.00";
    return;
  }

  // Calculate required stake2 to balance
  let stake2 = (stake1 * odds1) / odds2;
  document.getElementById("stake2").value = stake2.toFixed(2);

  calculateProfit(stake1, stake2, odds1, odds2);
}

function calculateFromStake2() {
  let odds1 = americanToDecimal(document.getElementById("odds1").value || document.getElementById("odds1Display").textContent);
  let odds2 = americanToDecimal(document.getElementById("odds2").value || document.getElementById("odds2Display").textContent);
  let stake2 = parseFloat(document.getElementById("stake2").value) || 0;

  if (!odds1 || !odds2 || stake2 <= 0) {
    document.getElementById("result").textContent = "Profit: $0.00";
    return;
  }

  // Calculate required stake1 to balance
  let stake1 = (stake2 * odds2) / odds1;
  document.getElementById("stake1").value = stake1.toFixed(2);

  calculateProfit(stake1, stake2, odds1, odds2);
}

// Core profit calculation
function calculateProfit(stake1, stake2, odds1, odds2) {
  // Potential returns
  let return1 = stake1 * odds1;
  let return2 = stake2 * odds2;

  // Net results if each side wins
  let profitIf1Wins = return1 - (stake1 + stake2);
  let profitIf2Wins = return2 - (stake1 + stake2);

  // Detect if arbitrage exists
  if (profitIf1Wins > 0 && profitIf2Wins > 0) {
    document.getElementById("result").textContent =
      `Arb Profit: $${Math.min(profitIf1Wins, profitIf2Wins).toFixed(2)}`;
    document.getElementById("result").style.color = "#4caf50";
  } else {
    document.getElementById("result").textContent =
      `No Arb (Profit if 1 wins: $${profitIf1Wins.toFixed(2)}, if 2 wins: $${profitIf2Wins.toFixed(2)})`;
    document.getElementById("result").style.color = "#ff5252";
  }
}
