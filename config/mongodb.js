const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () =>
  console.log(`Yay! mongodb connected : http://127.0.0.1:${PORT}`)
);

mongoose.connection.on("error", () => console.log("nay db error sorry :("));
