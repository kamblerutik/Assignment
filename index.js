require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Connect = require("./Database/db");
const router = require("./Routes/authRoutes");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api", router);

// app.route("/").get((req, res) => {
//   res.json({
//     msg: `Server is running on port: ${port}`,
//     API_Status: "Success!",
//   });
// });

Connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
