import { app } from "./app.js";
import debug from "debug";
import { connectToDB } from "./db/index.js";
import { port } from "./config/config.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

const dbgr = debug("index:development");

connectToDB()
  .then(() => {
    app.listen(port, () => dbgr(`Example app listening on port: ${port}`));
  })
  .catch((error) => {
    throw error;
  });

removeUnverifiedAccounts()
