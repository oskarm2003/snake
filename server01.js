const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
var path = require("path")
app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})