// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const arbCards = document.querySelectorAll(".arb-card");
  const sideA = document.getElementById("sideA");
  const sideB = document.getElementById("sideB");
  const profitCircle = document.getElementById("profitCircle");
  const defaultStakeInput = document.getElementById("defaultStake");

  // 🔹 Helper: Calculate implied probability
  function impliedProbability(odds) {
    odds = parseInt(odds);
    if (odds > 0) {
      return 100 / (odds + 100);
    } else {
      return Math.abs(odds) / (Math.abs(odds) + 100);
    }
  }

  // 🔹 Helper: Calculate stake + guaranteed profit
  function calculateStakes(oddsA, oddsB, stake) {
    const probA = impliedProbability(oddsA);
    const probB = impliedProbability(oddsB);

    const totalProb = probA + probB;
    if (totalProb >= 1) {
      return { stakeA: 0, stakeB: 0, profit: 0 }; // no arb
    }

    const stakeA = (stake * probB) / totalProb;
    const stakeB = (stake * probA) / totalProb;

    const payoutA = oddsA > 0 ? stakeA * (oddsA / 100) : stakeA / (Math.abs(oddsA) / 100);
    const payoutB = oddsB > 0 ? stakeB * (oddsB / 100) : stakeB / (Math.abs(oddsB) / 100);

    const profit = Math.min(payoutA - stakeB, payoutB - stakeA);

    return { stakeA: stakeA.toFixed(2), stakeB: stakeB.toFixed(2), profit: profit.toFixed(2) };
  }

  // 🔹 When clicking an arb card, fill calculator
  arbCards.forEach(card => {
    card.addEventListener("click", () => {
      const oddsA = card.getAttribute("data-odds-a");
      const oddsB = card.getAttribute("data-odds-b");
      const stake = parseFloat(defaultStakeInput.value) || 100;

      const { stakeA, stakeB, profit } = calculateStakes(oddsA, oddsB, stake);

      sideA.innerHTML = `${oddsA}<br>$${stakeA}`;
      sideB.innerHTML = `${oddsB}<br>$${stakeB}`;
      profitCircle.textContent = `Profit: $${profit}`;
      profitCircle.classList.add("pulse");
      setTimeout(() => profitCircle.classList.remove("pulse"), 600);
    });
  });

  // 🔹 OddsAPI Fetcher
  async function fetchArbs() {
    try {
      const res = await fetch(
        "https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=de315d01b18dc6e2e5dc488d219fce01&regions=us"
      );
      const data = await res.json();

      // Update arb cards dynamically with status
      document.querySelectorAll(".arb-card").forEach((card, i) => {
        const market = data[i];
        if (!market) return;

        const status = card.querySelector(".arb-status");
        if (market.bookmakers?.[0]?.markets?.[0]?.outcomes) {
          const home = market.bookmakers[0].markets[0].outcomes[0];
          const away = market.bookmakers[0].markets[0].outcomes[1];

          // Update odds + attributes
          card.setAttribute("data-odds-a", home.price > 0 ? `+${home.price}` : home.price);
          card.setAttribute("data-odds-b", away.price > 0 ? `+${away.price}` : away.price);

          card.querySelector("div:nth-child(3)").textContent = `Home: ${home.price}`;
          card.querySelector("div:nth-child(4)").textContent = `Away: ${away.price}`;
        }

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

  fetchArbs();
  setInterval(fetchArbs, 5000); // refresh every 5s
});
