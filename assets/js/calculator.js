// calculator.js

function convertAmericanToDecimal(odds) {
  if (odds > 0) {
    return (odds / 100) + 1;
  } else {
    return (100 / Math.abs(odds)) + 1;
  }
}

function calculateFromStake1() {
  const odds1 = parseFloat(document.getElementById('odds1').value);
  const odds2 = parseFloat(document.getElementById('odds2').value);
  const stake1 = parseFloat(document.getElementById('stake1').value);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake1)) {
    document.getElementById('result').innerText = 'Please enter valid numbers.';
    return;
  }

  const decOdds1 = convertAmericanToDecimal(odds1);
  const decOdds2 = convertAmericanToDecimal(odds2);

  const stake2 = (stake1 * decOdds1) / decOdds2;
  const profit = Math.min((stake1 * decOdds1), (stake2 * decOdds2)) - (stake1 + stake2);

  document.getElementById('stake2').value = stake2.toFixed(2);
  document.getElementById('result').innerHTML =
    `Stake 1: $${stake1.toFixed(2)}<br>Stake 2: $${stake2.toFixed(2)}<br>Profit: $${profit.toFixed(2)}`;
}

function calculateFromStake2() {
  const odds1 = parseFloat(document.getElementById('odds1').value);
  const odds2 = parseFloat(document.getElementById('odds2').value);
  const stake2 = parseFloat(document.getElementById('stake2').value);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake2)) {
    document.getElementById('result').innerText = 'Please enter valid numbers.';
    return;
  }

  const decOdds1 = convertAmericanToDecimal(odds1);
  const decOdds2 = convertAmericanToDecimal(odds2);

  const stake1 = (stake2 * decOdds2) / decOdds1;
  const profit = Math.min((stake1 * decOdds1), (stake2 * decOdds2)) - (stake1 + stake2);

  document.getElementById('stake1').value = stake1.toFixed(2);
  document.getElementById('result').innerHTML =
    `Stake 1: $${stake1.toFixed(2)}<br>Stake 2: $${stake2.toFixed(2)}<br>Profit: $${profit.toFixed(2)}`;
}

window.onload = () => showTab('calculator');

function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab');
  const buttons = document.querySelectorAll('nav button');

  tabs.forEach(tab => {
    tab.style.display = 'none';
    tab.classList.remove('active');
  });

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = 'block';
    activeTab.classList.add('active');
  }

  buttons.forEach(btn => btn.classList.remove('active'));
  const activeButton = document.querySelector(`nav button[data-tab="${tabId}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

