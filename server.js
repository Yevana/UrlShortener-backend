const express = require("express");

const app = express();
const bodyparser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const connectDB = require("./config/db");
connectDB();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "URL Shortener",
      version: "1.0.0",
      description: "A simple Url shortener Express Api",
    },
    server: [
      {
        url: "https://shorturlnodejs.herokuapp.com",
      },
    ]
  },
  apis:["./routes/*.js"]
};

const spec = swaggerJsDoc(option)

app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(spec));
app.use((req, resp, next) => {
  resp.setHeader("Access-Control-Allow-Origin", "*");

  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  resp.setHeader("Access-Control-Allow-Headers", "*");

  resp.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/getUrl", require("./routes/geturl"));
app.use("/api/GetAllShortUrl", require("./routes/getAllUrl"));
app.use("/api/", require("./routes/redirect"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
