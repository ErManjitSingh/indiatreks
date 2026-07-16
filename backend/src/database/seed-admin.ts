import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "./connection";
import { env } from "../config/env";
import { UserModel } from "../models/User.model";
import { logger } from "../utils/logger";

async function seedAdmin() {
  await connectDatabase();
  const email = env.SEED_SUPERADMIN_EMAIL || "admin@indiaholidaydestinations.com";
  const password = env.SEED_SUPERADMIN_PASSWORD || "ChangeMe@12345";
  const name = env.SEED_SUPERADMIN_NAME || "Super Admin";
  const passwordHash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);

  const user = await UserModel.findOneAndUpdate(
    { email },
    {
      name,
      email,
      passwordHash,
      role: "super_admin",
      isEmailVerified: true,
      status: "active",
      deletedAt: null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  logger.info("Admin upserted", { id: user._id, email: user.email, role: user.role });
  await disconnectDatabase();
}

seedAdmin().catch(async (error) => {
  console.error(error);
  await disconnectDatabase();
  process.exit(1);
});
