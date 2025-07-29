// ============================
// BTB Dashboard JS
// ============================

// ✅ Convert Decimal Odds → American Odds
function convertDecimalToAmerican(decimal) {
  if (decimal >= 2.0) {
    return `+${Math.round((decimal - 1) * 100)}`;
  } else {
    return `${Math.round(-100 / (decimal - 1))}`;
  }
}

// ✅ Fetch Odds API
async function fetchOdds() {
  try {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/upcoming/odds?apiKey=de315d01b18dc6e2e5dc488d219fce01&regions=us&markets=h2h&oddsFormat=decimal`
    );

    if (!response.ok) throw new Error("API Request Failed");
    const data = await response.json();

    console.log("API Response:", data);

    renderArbCards(data);
  } catch (error) {
    console.error("Error fetching odds:", error);
  }
}

// ✅ Render Arb Cards (Left Panel)
function renderArbCards(data) {
  const feed = document.querySelector(".left-feed");
  feed.innerHTML = ""; // Clear old cards

  data.forEach((game) => {
    if (!game.bookmakers || game.bookmakers.length === 0) return;

    const market = game.bookmakers[0].markets[0];
    if (!market || !market.outcomes || market.outcomes.length < 2) return;

    const homeDecimal = market.outcomes[0].price;
    const awayDecimal = market.outcomes[1].price;

    const homeOdds = convertDecimalToAmerican(homeDecimal);
    const awayOdds = convertDecimalToAmerican(awayDecimal);

    const card = document.createElement("div");
    card.classList.add("arb-card");
    card.innerHTML = `
      <div class="arb-header">
        <span class="arb-percent">Arb?</span>
        <span class="arb-status">Live</span>
      </div>
      <div>Game: ${game.home_team} vs ${game.away_team}</div>
      <div>Home: ${homeOdds}</div>
      <div>Away: ${awayOdds}</div>
      <div class="arb-bar"></div>
    `;

    feed.appendChild(card);
  });
}

// ✅ Sportsbook Totals
function updateSportsbookTotals() {
  const books = document.querySelectorAll(".book");
  let total = 0;

  books.forEach((book) => {
    const balance = parseFloat(book.querySelector("span:last-child").textContent.replace("$", ""));
    total += balance;
  });

  const totalBox = document.querySelector(".total-box");
  if (totalBox) totalBox.textContent = `Total: $${total}`;
}

// ✅ Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchOdds();
  updateSportsbookTotals();

  // Auto-refresh every 5s
  setInterval(fetchOdds, 5000);
});
