// === CONFIG ===
const API_KEY = "de315d01b18dc6e2e5dc488d219fce01"; // <-- replace with your key
const API_URL = `https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=us&markets=h2h&apiKey=${API_KEY}`;

// === FETCH ODDS & RENDER ARBS ===
async function fetchArbs() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    console.log("API Response:", data); // debug
    renderArbs(data);
  } catch (err) {
    console.error("API Fetch Error:", err);
  }
}

// === RENDER ARB CARDS ===
function renderArbs(games) {
  const feed = document.querySelector(".left-feed");
  feed.innerHTML = ""; // clear old cards

  games.forEach(game => {
    if (!game.bookmakers || game.bookmakers.length === 0) return;

    // Grab odds from first bookmaker (expand later)
    const outcomes = game.bookmakers[0].markets[0].outcomes;
    const home = outcomes.find(o => o.name === game.home_team);
    const away = outcomes.find(o => o.name === game.away_team);

    if (!home || !away) return;

    // Create arb card
    const card = document.createElement("div");
    card.classList.add("arb-card");
    card.setAttribute("data-odds-a", home.price);
    card.setAttribute("data-odds-b", away.price);

    card.innerHTML = `
      <div class="arb-header">
        <span class="arb-percent">Arb?</span>
        <span class="arb-status">Live</span>
      </div>
      <div>Game: ${game.home_team} vs ${game.away_team}</div>
      <div>Home: ${home.price}</div>
      <div>Away: ${away.price}</div>
      <div class="arb-bar"></div>
    `;

    // Attach click → auto-fill calculator
    card.addEventListener("click", () => {
      const stake = parseFloat(document.getElementById("defaultStake").value) || 100;
      fillCalculator(home.price, away.price, stake);
    });

    feed.appendChild(card);
  });
}

// === FILL CALCULATOR ===
function fillCalculator(oddsA, oddsB, stake) {
  const sideA = document.getElementById("sideA");
  const sideB = document.getElementById("sideB");
  const profitCircle = document.getElementById("profitCircle");

  const decOddsA = toDecimalOdds(oddsA);
  const decOddsB = toDecimalOdds(oddsB);

  // Stake allocation formula
  const stakeA = (stake * decOddsB) / (decOddsA + decOddsB);
  const stakeB = stake - stakeA;

  const profit = (stakeA * (decOddsA - 1)) - (stake - stakeA);

  sideA.innerHTML = `${oddsA}<br>$${stakeA.toFixed(2)}`;
  sideB.innerHTML = `${oddsB}<br>$${stakeB.toFixed(2)}`;
  profitCircle.innerHTML = `Profit: $${profit.toFixed(2)}`;
}

// === ODDS CONVERSION ===
function toDecimalOdds(odds) {
  if (typeof odds === "string") odds = parseFloat(odds);
  if (odds > 0) return 1 + odds / 100;
  return 1 + 100 / Math.abs(odds);
}

// === AUTO REFRESH EVERY 5 SECS ===
setInterval(fetchArbs, 5000);
fetchArbs();
