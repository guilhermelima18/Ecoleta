const db = require("../database/db");

function pageIndex(req, res) {
    return res.render("index.html")
};

function pageCreate(req, res) {
    return res.render("create-point.html")
};

function pageSearch(req, res) {
    const search = req.query.city;

    if (search == "") {
        return res.render("search-results.html", { total: 0 });
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length;
        return res.render("search-results.html", { places: rows, total });
    })
};

function pageSave(req, res) {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return res.send("Erro no cadastro");
        }

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);
}

module.exports = {
    pageIndex,
    pageCreate,
    pageSearch,
    pageSave
};