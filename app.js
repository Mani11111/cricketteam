const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/players/", async (request, response) => {
  const getCricket_teamQuery = `
    SELECT * FROM cricket_team ORDER BY player_id; 
    `;
  const playersArray = await db.all(getPlayersQuery);
  response.send(playersArray);
});
