import { connectDatabase, disconnectDatabase } from "../database/connection";
import { SearchConsoleCacheModel } from "../models/SearchConsoleCache.model";

async function main() {
  await connectDatabase();
  const r = await SearchConsoleCacheModel.deleteMany({ key: "default" });
  console.log(JSON.stringify({ cache_cleared: r.deletedCount }));
  await disconnectDatabase();
}

main().catch(async (e) => {
  console.error(e);
  await disconnectDatabase();
  process.exit(1);
});
