import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db from "~/db/drizzle";
import { createRouter } from "~/router";

console.log("Migrating database...");
await migrate(db, { migrationsFolder: "./drizzle" })
  .then(() => console.log("Migration was successful"))
  .catch((e) => {
    console.error("An error occurred during migration: ", e);
  });

export default createStartHandler({
  createRouter,
})(defaultStreamHandler);
