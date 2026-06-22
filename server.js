import "dotenv/config";
import app from "./app.js";

const port = process.env.PORT || 3000; // Sécurité si le PORT n'est pas défini

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});