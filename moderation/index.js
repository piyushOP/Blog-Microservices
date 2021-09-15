const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "commentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post("httsp://localhost:4005/events", {
      type: "commentModerated",
      data: {
        id: data.id,
        content: data.content,
        status,
        postId: data.postId,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003....");
});
