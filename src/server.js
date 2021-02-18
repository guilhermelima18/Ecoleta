const express = require("express");
const { pageIndex, pageCreate, pageSearch, pageSave } = require("./routes/routes.js");
const server = express();

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.listen(5000);

const nunjucks = require("nunjucks");
nunjucks.configure("src/pages", {
    express: server,
    noCache: true
});

server.get("/", pageIndex);

server.get("/create-point", pageCreate);

server.get("/search", pageSearch);

server.post("/savepoint", pageSave);