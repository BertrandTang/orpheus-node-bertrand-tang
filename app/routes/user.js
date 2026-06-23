import express from "express";

const router = express();

router.post("/signup", function (req, res) {
    res.send("You are signup");
});

router.post("/login", function (req, res) {
    res.send("You are login");
});

export default router;
