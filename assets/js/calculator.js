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
  const line1 = parseFloat(document.getElementById('line1')?.value || 0);
  const line2 = parseFloat(document.getElementById('line2')?.value || 0);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake1)) {
    document.getElementById('result').innerText = 'Please enter valid numbers.';
    return;
  }

  const decOdds1 = convertAmericanToDecimal(odds1);
  const decOdds2 = convertAmericanToDecimal(odds2);

  const stake2 = (stake1 * decOdds1) / decOdds2;
  const totalStake = stake1 + stake2;
  const profit = Math.min((stake1 * decOdds1), (stake2 * decOdds2)) - totalStake;
  const middleDetected = (line1 && line2 && line1 < line2);

  document.getElementById('stake2').value = stake2.toFixed(2);
  let resultHTML = `
    Stake 1: $${stake1.toFixed(2)}<br>
    Stake 2: $${stake2.toFixed(2)}<br>
    Profit: <span style="color:${profit >= 0 ? 'green' : 'red'}">$${profit.toFixed(2)}</span><br>
    ${middleDetected ? '<span style="color:orange">Middle Opportunity Detected!</span>' : ''}
  `;
  document.getElementById('result').innerHTML = resultHTML;
}

function calculateFromStake2() {
  const odds1 = parseFloat(document.getElementById('odds1').value);
  const odds2 = parseFloat(document.getElementById('odds2').value);
  const stake2 = parseFloat(document.getElementById('stake2').value);
  const line1 = parseFloat(document.getElementById('line1')?.value || 0);
  const line2 = parseFloat(document.getElementById('line2')?.value || 0);

  if (isNaN(odds1) || isNaN(odds2) || isNaN(stake2)) {
    document.getElementById('result').innerText = 'Please enter valid numbers.';
    return;
  }

  const decOdds1 = convertAmericanToDecimal(odds1);
  const decOdds2 = convertAmericanToDecimal(odds2);

  const stake1 = (stake2 * decOdds2) / decOdds1;
  const totalStake = stake1 + stake2;
  const profit = Math.min((stake1 * decOdds1), (stake2 * decOdds2)) - totalStake;
  const middleDetected = (line1 && line2 && line1 < line2);

  document.getElementById('stake1').value = stake1.toFixed(2);
  let resultHTML = `
    Stake 1: $${stake1.toFixed(2)}<br>
    Stake 2: $${stake2.toFixed(2)}<br>
    Profit: <span style="color:${profit >= 0 ? 'green' : 'red'}">$${profit.toFixed(2)}</span><br>
    ${middleDetected ? '<span style="color:orange">Middle Opportunity Detected!</span>' : ''}
  `;
  document.getElementById('result').innerHTML = resultHTML;
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
