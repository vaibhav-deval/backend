require("dotenv").config();
const app = require("./src/app.js");
const connectToDB = require("./src/config/database.js");

const URI = process.env.URI;
const PORT = process.env.PORT || 3000;

connectToDB(URI);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
