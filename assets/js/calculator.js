document.getElementById("calcForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const odds1 = parseFloat(document.getElementById("odds1").value);
  const odds2 = parseFloat(document.getElementById("odds2").value);
  const stake = parseFloat(document.getElementById("stake").value);
  const decimal1 = odds1 > 0 ? (odds1 / 100 + 1) : (100 / Math.abs(odds1) + 1);
  const decimal2 = odds2 > 0 ? (odds2 / 100 + 1) : (100 / Math.abs(odds2) + 1);
  const inverse1 = 1 / decimal1;
  const inverse2 = 1 / decimal2;
  const arbPercent = (inverse1 + inverse2) * 100;
  const isArb = arbPercent < 100;
  const stake1 = (stake * inverse1) / (inverse1 + inverse2);
  const stake2 = (stake * inverse2) / (inverse1 + inverse2);
  const payout1 = stake1 * decimal1;
  const payout2 = stake2 * decimal2;
  const profit = Math.min(payout1, payout2) - stake;
  document.getElementById("result").innerHTML = `
    <p>Arbitrage %: ${arbPercent.toFixed(2)}%</p>
    <p>${isArb ? "✅ Arbitrage Exists!" : "❌ No Arbitrage"}</p>
    <p>Stake on Book 1: $${stake1.toFixed(2)}</p>
    <p>Stake on Book 2: $${stake2.toFixed(2)}</p>
    <p>Guaranteed Profit: $${profit.toFixed(2)}</p>
  `;
});
