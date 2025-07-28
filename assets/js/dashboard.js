function showTab(tabName) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabName).style.display = 'block';
}

function calculate() {
  const odds1 = parseFloat(document.getElementById('odds1').value);
  const odds2 = parseFloat(document.getElementById('odds2').value);
  const stake = parseFloat(document.getElementById('stake').value);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake)) {
    document.getElementById('result').innerText = 'Please enter valid numbers.';
    return;
  }

  const totalInverse = (1 / odds1) + (1 / odds2);
  const bet1 = stake / (1 + (odds1 / odds2));
  const bet2 = stake - bet1;
  const profit = Math.min(bet1 * odds1, bet2 * odds2) - stake;

  document.getElementById('result').innerHTML =
    `Bet 1: $${bet1.toFixed(2)}<br>Bet 2: $${bet2.toFixed(2)}<br>Profit: $${profit.toFixed(2)}`;
}

window.onload = () => showTab('calculator');
