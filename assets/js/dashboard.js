// dashboard.js

async function fetchArbs() {
  try {
    // Example OddsAPI endpoint (replace with your key & params)
    const res = await fetch("https://api.the-odds-api.com/v4/sports/upcoming/odds/?apiKey=YOUR_API_KEY&regions=us");
    const data = await res.json();

    // Go through arb cards on the page
    document.querySelectorAll(".arb-card").forEach((card, i) => {
      const market = data[i]; // temp match card to API record
      if (!market) return;

      // if OddsAPI status is suspended/closed
      if (market.status === "suspended" || market.status === "closed") {
        card.classList.add("closed");
      } else {
        card.classList.remove("closed");
      }
    });

  } catch (err) {
    console.error("Error fetching odds:", err);
  }
}

// Run once when page loads
fetchArbs();

// Refresh every 5 seconds
setInterval(fetchArbs, 5000);
