import express from "express";

const router = express();

router.get("/", function (req, res) {
    res.send("List of woods");
});

export default router;
