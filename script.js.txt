function calculate() {
  const odds1 = parseFloat(document.getElementById("odds1").value);
  const odds2 = parseFloat(document.getElementById("odds2").value);
  const stake = parseFloat(document.getElementById("stake").value);

  if (!odds1 || !odds2 || !stake) {
    document.getElementById("result").innerText = "Please fill all fields.";
    return;
  }

  const implied1 = 1 / odds1;
  const implied2 = 1 / odds2;
  const totalImplied = implied1 + implied2;

  if (totalImplied < 1) {
    const bet1 = stake * implied1 / totalImplied;
    const bet2 = stake * implied2 / totalImplied;
    const profit = Math.min(bet1 * odds1, bet2 * odds2) - stake;

    document.getElementById("result").innerText =
      `Bet $${bet1.toFixed(2)} on Odds 1 and $${bet2.toFixed(2)} on Odds 2.\nProfit: $${profit.toFixed(2)}`;
  } else {
    document.getElementById("result").innerText = "No arbitrage opportunity.";
  }
}
