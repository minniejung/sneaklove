const PORT = process.env.PORT || 4000;
const mongoose = require("mongoose");

mongoose.connect(process.env.FAKE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log(`Yay! mongodb connected : http://127.0.0.1:${PORT}`)
);

mongoose.connection.on("error", () =>
  console.log("nay db connexion error sorry :(")
);
