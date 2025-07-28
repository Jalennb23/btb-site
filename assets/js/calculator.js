function calculateFromStake1() {
  const odds1 = parseFloat(document.getElementById('odds1').value);
  const odds2 = parseFloat(document.getElementById('odds2').value);
  const stake1 = parseFloat(document.getElementById('stake1').value);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake1)) {
    document.getElementById('result').innerText = 'Enter valid numbers.';
    return;
  }

  const stake2 = (stake1 * odds1) / odds2;
  const totalStake = stake1 + stake2;
  const payout1 = stake1 * odds1;
  const payout2 = stake2 * odds2;
  const profit = Math.min(payout1, payout2) - totalStake;

  document.getElementById('stake2').value = stake2.toFixed(2);
  document.getElementById('result').innerHTML = `
    Stake 1: $${stake1.toFixed(2)}<br>
    Stake 2: $${stake2.toFixed(2)}<br>
    Total Stake: $${totalStake.toFixed(2)}<br>
    Profit: $${profit.toFixed(2)}
  `;
}

function calculateFromStake2() {
  const odds1 = parseFloat(document.getElementById('odds1').value);
  const odds2 = parseFloat(document.getElementById('odds2').value);
  const stake2 = parseFloat(document.getElementById('stake2').value);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake2)) {
    document.getElementById('result').innerText = 'Enter valid numbers.';
    return;
  }

  const stake1 = (stake2 * odds2) / odds1;
  const totalStake = stake1 + stake2;
  const payout1 = stake1 * odds1;
  const payout2 = stake2 * odds2;
  const profit = Math.min(payout1, payout2) - totalStake;

  document.getElementById('stake1').value = stake1.toFixed(2);
  document.getElementById('result').innerHTML = `
    Stake 1: $${stake1.toFixed(2)}<br>
    Stake 2: $${stake2.toFixed(2)}<br>
    Total Stake: $${totalStake.toFixed(2)}<br>
    Profit: $${profit.toFixed(2)}
  `;
}
