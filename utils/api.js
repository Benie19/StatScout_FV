export const fetchMatches = async () => {
  try {
    const response = await fetch("https://api.football-data.org/v4/matches", {
      method: "GET",
      headers: {
        "X-Auth-Token": "d520d8db1315429b89d18f727f26e16a", // API token
        "User-Agent": "StatScout",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();

    const stripTime = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const today = stripTime(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const matches = data.matches.map((match) => {
      const matchDate = stripTime(new Date(match.utcDate));
      let category;

      if (matchDate.getTime() === yesterday.getTime()) {
        category = "Yesterday";
      } else if (matchDate.getTime() === today.getTime()) {
        category = "Today";
      } else if (matchDate.getTime() === tomorrow.getTime()) {
        category = "Tomorrow";
      } else {
        category = "Other";
      }

      return {
        id: match.id,
        home: {
          name: match.homeTeam?.name || "Unknown Team",
          crest: match.homeTeam?.crest || null, // Include home team logo
        },
        away: {
          name: match.awayTeam?.name || "Unknown Team",
          crest: match.awayTeam?.crest || null, // Include away team logo
        },
        score: `${match.score?.fullTime?.home || 0}-${
          match.score?.fullTime?.away || 0
        }`,
        time: new Date(match.utcDate).toLocaleString(),
        venue: match.venue || "Unknown Venue",
        category,
      };
    });

    return matches;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};
