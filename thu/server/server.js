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

function solveEquations(a1, b1, c1, a2, b2, c2) {
  const determinant = a1 * b2 - a2 * b1;

  if (determinant === 0) {
    throw new Error("Hệ phương trình vô nghiệm hoặc vô số nghiệm");
  }

  const x = (c1 * b2 - c2 * b1) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;

  return { x, y };
}


const d1= 12;
const d2=20;
const d3=30;

app.get("/display", async (req, res) => {

  try {
    const xxxxxx = await position.find().sort({ _id: -1 }).limit(1);
    console.log(xxxxxx)
    // const existingData = xxxxxx[xxxxxx.length - 1];
    // console.log(existingData)
    if (xxxxxx) {
      const { x1, y1, x2, y2, x3, y3 } = xxxxxx[0];

      const c1 = d1**2 - d2**2 - x1**2 + x2**2 - y1**2 + y2**2;
      const c2 = d1**2 - d3**2 - x1**2 + x3**2 - y1**2 + y3**2;
      const a1 = 2 * (x2 - x1);
      const b1 = 2 * (y2 - y1);
      const a2 = 2 * (x3 - x1);
      const b2 = 2 * (y3 - y1);
      
      console.log(x1)

      const result = solveEquations(a1, b1, c1, a2, b2, c2);
      console.log(result)
      res.json({ x: result.x, y: result.y });
    } else {
      console.log("chưa có data");
    }
  } catch (error) {
    console.error("Error:", error);
    res.json("fail");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
