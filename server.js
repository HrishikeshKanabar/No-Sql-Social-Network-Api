const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
const { User, Thought } = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Socialdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//mongoose.set('useCreateIndex', true);
mongoose.set("debug", true);

// Use routes from folder
app.use(require("./routes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
