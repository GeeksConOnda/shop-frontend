const designs = require("./data/designs.json");

module.exports = ((req, res) => {
    res.json(designs);
});