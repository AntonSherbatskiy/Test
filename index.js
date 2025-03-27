const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/users", (req, res) => {
    res.json([{ id: 1, first_name: "Anton" }]);
});

app.get("/test", (req, res) => {
    res.send("Test");
});

app.listen(3000, () => {
    console.log("Server is started");
})
