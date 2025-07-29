// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  const arbFeed = document.querySelector(".left-feed");

  async function fetchArbs() {
    try {
      const res = await fetch(
        "https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=ba59c5c78c1cb84d7b6f63b30ad3070a&regions=us&markets=h2h"
      );
      const data = await res.json();

      // Clear old cards
      arbFeed.innerHTML = "";

      // Loop through first 5 events for now
      data.slice(0, 5).forEach(event => {
        const bookmakers = event.bookmakers || [];
        const firstBook = bookmakers[0];

        // Default odds
        let homeOdds = "N/A";
        let awayOdds = "N/A";

        if (firstBook && firstBook.markets && firstBook.markets[0]) {
          const outcomes = firstBook.markets[0].outcomes;
          if (outcomes[0]) homeOdds = outcomes[0].price;
          if (outcomes[1]) awayOdds = outcomes[1].price;
        }

        // Build card
        const card = document.createElement("div");
        card.className = "arb-card";

        card.innerHTML = `
          <div class="arb-header">
            <span>${event.home_team} vs ${event.away_team}</span>
            <span class="arb-percent">Arb % TBD</span>
          </div>
          <div class="arb-status">${event.status === "closed" || event.status === "suspended" ? "Bet Closed" : "Live"}</div>
          <div>Home: ${homeOdds}</div>
          <div>Away: ${awayOdds}</div>
          <div class="arb-bar"></div>
        `;

        if (event.status === "closed" || event.status === "suspended") {
          card.classList.add("closed");
        }

        arbFeed.appendChild(card);
      });
    } catch (err) {
      console.error("Error fetching odds:", err);
    }
  }

  // Run once and refresh every 5s
  fetchArbs();
  setInterval(fetchArbs, 5000);
});
