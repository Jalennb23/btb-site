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
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const buttons = document.querySelectorAll('nav button');

  // Hide all tab content
  tabs.forEach(tab => {
    tab.style.display = 'none';
    tab.classList.remove('active');
  });

  // Show the selected tab content
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = 'block';
    activeTab.classList.add('active');
  }

  // Remove 'active' class from all buttons
  buttons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  const activeButton = document.querySelector(`nav button[data-tab="${tabId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}
function trackBet(bookId, amount) {
  const input = document.getElementById(bookId);
  const current = parseFloat(input.value) || 0;
  const newBalance = current - amount;

  if (newBalance < 0) {
    alert("Insufficient balance on " + bookId.replace('Balance', ''));
    return;
  }

  input.value = newBalance.toFixed(2);
  alert(`$${amount.toFixed(2)} deducted from ${bookId.replace('Balance', '')}`);
}
