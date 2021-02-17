const sqlite = require("sqlite").verbose();

const db = new sqlite.Database("./src/database/database.db");

module.exports = db;

db.serialize(() => {});