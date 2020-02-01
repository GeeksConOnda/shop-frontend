const https = require("https");
const url = 'https://gco-orders.s3-sa-east-1.amazonaws.com/gco-orders.csv';

module.exports = (req, res) => {
    https.get(url, orders => {
        orders.setEncoding("utf8");
        let body = "";
        orders.on("data", data => {
            body += data;
        });
        orders.on("end", () => {
            try {
                const data = body.split("\n").map(row => row.trim().split(",")).slice(1);
                const order = data.find(row => row[0] === req.query.id);
                const date = new Date(`${order[2]} ${order[3]}`);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");

                res.json({
                    id: order[0],
                    date: `${day}/${month}/${year}`,
                    status: order[4],
                    trackingCode: order[5]
                });
            } catch (e) {
                res.json({
                    status: "Pedido no encontrado"
                });
            }
        });
    });
};