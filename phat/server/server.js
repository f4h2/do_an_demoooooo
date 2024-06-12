const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Kết nối tới MongoDB
mongoose.connect("mongodb+srv://truonglocnguyenkhanh:iv2iHjkjBwMCoccu@doan.ckcthqb.mongodb.net/?retryWrites=true&w=majority&appName=DoAn");

const position = require('./mongo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/inputXYZ", async (req, res) => {
  const { x1, y1, x2,y2,x3,y3 } = req.body;

  try {
    const existingData = await position.findOne({ x1: x1, y1: y1,x2: x2, y2: y2,x3: x3, y3: y3  });

    if (existingData) {
      const data={
        x1:x1,
        y1:y1,

        x2:x2,
        y2:y2,

        x3:x3,
        y3:y3,

      }
      await position.insertMany([data]);
      res.json("ok");
    } else {
      const data={
        x1:x1,
        y1:y1,

        x2:x2,
        y2:y2,

        x3:x3,
        y3:y3,

      }
      await position.insertMany([data]);
      res.json("ok");
    }
  } catch (error) {
    console.error("Error:", error);
    res.json("fail");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
