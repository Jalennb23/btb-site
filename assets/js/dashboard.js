// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const arbFeed = document.querySelector(".left-feed");
  const calcBox = document.querySelector(".calc-box");
  const leftSide = calcBox.querySelector(".side:first-child");
  const rightSide = calcBox.querySelector(".side:last-child");
  const profitCircle = calcBox.querySelector(".center-circle");
  const stakeInput = document.getElementById("defaultStake"); // ✅ stake input box

  // ===============================
  // 1. Stake persistence (localStorage)
  // ===============================
  const savedStake = localStorage.getItem("defaultStake");
  if (savedStake) {
    stakeInput.value = savedStake;
  } else {
    stakeInput.value = 100; // fallback default
  }

  stakeInput.addEventListener("input", () => {
    localStorage.setItem("defaultStake", stakeInput.value);
  });

  // ===============================
  // 2. Fill Calculator Helper
  // ===============================
  function fillCalculator(homeOdds, awayOdds) {
    const stake = parseFloat(stakeInput.value) || 100;

    // Convert odds to implied probability
    const probHome = americanToDecimal(homeOdds);
    const probAway = americanToDecimal(awayOdds);

    // Stake split
    const stakeHome = (stake * (1 / probHome)) / ((1 / probHome) + (1 / probAway));
    const stakeAway = stake - stakeHome;

    // Profit (simplified guaranteed calc)
    const profit = Math.min(stakeHome * (probHome - 1), stakeAway * (probAway - 1));

    // Update UI
    leftSide.innerHTML = `${homeOdds}<br>$${stakeHome.toFixed(2)}`;
    rightSide.innerHTML = `${awayOdds}<br>$${stakeAway.toFixed(2)}`;
    profitCircle.textContent = `Profit: $${profit.toFixed(2)}`;
    profitCircle.classList.add("pulse");
    setTimeout(() => profitCircle.classList.remove("pulse"), 600);
  }

  // Convert American odds → Decimal
  function americanToDecimal(odds) {
    odds = parseFloat(odds);
    if (odds > 0) return (odds / 100) + 1;
    else return (100 / Math.abs(odds)) + 1;
  }

  // ===============================
  // 3. Handle Click on Arb Cards
  // ===============================
  arbFeed.addEventListener("click", (e) => {
    const card = e.target.closest(".arb-card");
    if (!card) return;

    const homeText = card.querySelector("div:nth-child(3)").textContent.replace("Home: ", "");
    const awayText = card.querySelector("div:nth-child(4)").textContent.replace("Away: ", "");

    fillCalculator(homeText, awayText);
  });

  // ===============================
  // 4. OddsAPI Fetch (replace YOUR_API_KEY)
  // ===============================
  async function fetchArbs() {
    try {
      const res = await fetch("https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=YOUR_API_KEY&regions=us");
      const data = await res.json();

      document.querySelectorAll(".arb-card").forEach((card, i) => {
        const market = data[i];
        if (!market) return;

        if (market.status === "suspended" || market.status === "closed") {
          card.classList.add("closed");
          const status = card.querySelector(".arb-status");
          if (status) status.textContent = "Bet Closed";
        } else {
          card.classList.remove("closed");
          const status = card.querySelector(".arb-status");
          if (status) status.textContent = "Live";
        }
      });

    } catch (err) {
      console.error("Error fetching odds:", err);
    }
  }

  fetchArbs();
  setInterval(fetchArbs, 5000);
});
document.addEventListener("DOMContentLoaded", () => {
  const stakeInput = document.getElementById("defaultStake");
  const sideA = document.getElementById("sideA");
  const sideB = document.getElementById("sideB");
  const profitCircle = document.getElementById("profitCircle");

  // Example odds (replace with live odds later)
  let oddsA = +100;
  let oddsB = -100;

  // Function to calculate payouts & guaranteed profit
  function updateCalculator() {
    const stake = parseFloat(stakeInput.value) || 0;

    // Stake amounts (for now just same stake both sides)
    let stakeA = stake;
    let stakeB = stake;

    // Payout calculations
    let payoutA = oddsA > 0 ? stakeA * (oddsA / 100) : stakeA / (Math.abs(oddsA) / 100);
    let payoutB = oddsB > 0 ? stakeB * (oddsB / 100) : stakeB / (Math.abs(oddsB) / 100);

    // Guaranteed profit = smaller payout - total stake
    let totalStake = stakeA + stakeB;
    let guaranteedProfit = Math.min(payoutA, payoutB) - totalStake;

    // Update UI
    sideA.innerHTML = `${oddsA}<br>$${stakeA.toFixed(2)}`;
    sideB.innerHTML = `${oddsB}<br>$${stakeB.toFixed(2)}`;
    profitCircle.textContent = `Profit: $${guaranteedProfit.toFixed(2)}`;

    // Animate profit circle when value changes
    profitCircle.classList.add("pulse");
    setTimeout(() => profitCircle.classList.remove("pulse"), 600);
  }

  // Update on stake change
  stakeInput.addEventListener("input", updateCalculator);

  // Run once on page load
  updateCalculator();
});
