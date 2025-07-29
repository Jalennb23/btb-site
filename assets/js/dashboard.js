// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const arbCards = document.querySelectorAll(".arb-card");
  const sideA = document.getElementById("sideA");
  const sideB = document.getElementById("sideB");
  const profitCircle = document.getElementById("profitCircle");
  const defaultStakeInput = document.getElementById("defaultStake");

  // 🔹 OddsAPI Fetch (placeholder – replace with your real API key)
  async function fetchArbs() {
    try {
      const res = await fetch("https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=YOUR_API_KEY&regions=us");
      const data = await res.json();

      document.querySelectorAll(".arb-card").forEach((card, i) => {
        const market = data[i]; // temporary mapping
        if (!market) return;

        const status = card.querySelector(".arb-status");
        if (market.status === "suspended" || market.status === "closed") {
          card.classList.add("closed");
          if (status) status.textContent = "Bet Closed";
        } else {
          card.classList.remove("closed");
          if (status) status.textContent = "Live";
        }
      });

    } catch (err) {
      console.error("Error fetching odds:", err);
    }
  }

  // Run fetch initially + every 5s
  fetchArbs();
  setInterval(fetchArbs, 5000);

  // 🔹 Arb Card Click → Fill Calculator
  arbCards.forEach(card => {
    card.addEventListener("click", () => {
      const oddsA = parseInt(card.dataset.oddsA, 10);
      const oddsB = parseInt(card.dataset.oddsB, 10);
      const stake = parseFloat(defaultStakeInput.value);

      if (!oddsA || !oddsB || !stake) return;

      // Convert American odds to decimal
      function americanToDecimal(odds) {
        return odds > 0 ? (odds / 100) + 1 : (100 / Math.abs(odds)) + 1;
      }

      const decA = americanToDecimal(oddsA);
      const decB = americanToDecimal(oddsB);

      // Calculate stakes proportionally to guarantee profit
      const stakeA = (stake * decB) / (decA + decB);
      const stakeB = stake - stakeA;

      // Guaranteed profit
      const payoutA = stakeA * decA;
      const payoutB = stakeB * decB;
      const profit = Math.min(payoutA, payoutB) - stake;

      // Update UI
      sideA.innerHTML = `${oddsA}<br>$${stakeA.toFixed(2)}`;
      sideB.innerHTML = `${oddsB}<br>$${stakeB.toFixed(2)}`;
      profitCircle.textContent = `Profit: $${profit.toFixed(2)}`;

      // Animate profit pulse
      profitCircle.classList.add("pulse");
      setTimeout(() => profitCircle.classList.remove("pulse"), 600);
    });
  });
});
