import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, "../../", "client/dist");

const app = express();

app.use(express.static(frontendPath));

app.get("/api", (req, res) => {
    res.send("Hello World!");
    console.log("Hello World!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});