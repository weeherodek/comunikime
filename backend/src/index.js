const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

require("./Database");
const app = require("./app");

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
