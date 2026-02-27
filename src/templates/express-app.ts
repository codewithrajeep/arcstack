import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "Archon backend ready",
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
