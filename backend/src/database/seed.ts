import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "./connection";
import { env } from "../config/env";
import { UserModel } from "../models/User.model";
import { DestinationModel } from "../models/Destination.model";
import { SettingModel } from "../models/Setting.model";
import { CategoryModel } from "../models/Category.model";
import { logger } from "../utils/logger";

async function seed() {
  await connectDatabase();

  const email = env.SEED_SUPERADMIN_EMAIL || "admin@indiaholidaydestinations.com";
  const password = env.SEED_SUPERADMIN_PASSWORD || "ChangeMe@12345";
  const name = env.SEED_SUPERADMIN_NAME || "Super Admin";

  const passwordHash = await bcrypt.hash(password, env.BCRYPT_ROUNDS);
  await UserModel.findOneAndUpdate(
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
  logger.info("Super admin ready", { email });

  const destinations = [
    {
      slug: "dharamshala",
      name: "Dharamshala",
      region: "Dhauladhar Range",
      state: "Himachal Pradesh",
      summary: "Gateway to Triund, Kareri, Indrahar and 40+ Dhauladhar treks.",
      description:
        "Dharamshala and McLeod Ganj sit beneath the Dhauladhar wall — ideal for weekend ridges and serious alpine crossings.",
      coverImage: "/images/treks/hero.jpg",
      trekCount: 46,
      bestSeasons: ["spring", "autumn", "summer"],
      altitudeRange: { min: 3500, max: 19300 },
      highlights: ["Triund", "Kareri Lake", "Indrahar Pass", "Lahesh Cave"],
      status: "published",
    },
    {
      slug: "mcleod-ganj",
      name: "McLeod Ganj",
      region: "Dharamshala",
      state: "Himachal Pradesh",
      summary: "Bhagsu, Snowline, Laka and classic weekend Himalayan trails.",
      description: "Café culture meets Dhauladhar trailheads.",
      coverImage: "/images/treks/landscape-1.jpg",
      trekCount: 12,
      bestSeasons: ["spring", "autumn", "winter"],
      altitudeRange: { min: 6000, max: 14500 },
      highlights: ["Bhagsu Waterfall", "Triund", "Snowline"],
      status: "published",
    },
    {
      slug: "manali",
      name: "Manali",
      region: "Kullu Valley",
      state: "Himachal Pradesh",
      summary: "Hampta Pass, Bhrigu Lake and high-altitude classics.",
      description: "Kullu–Manali base for meadows, passes and glacier walks.",
      coverImage: "/images/treks/mountains-1.jpg",
      trekCount: 10,
      bestSeasons: ["summer", "autumn"],
      altitudeRange: { min: 6000, max: 17500 },
      highlights: ["Hampta Pass", "Bhrigu Lake", "Beas Kund"],
      status: "published",
    },
    {
      slug: "kasol",
      name: "Kasol",
      region: "Parvati Valley",
      state: "Himachal Pradesh",
      summary: "Kheerganga, Sar Pass and Parvati Valley adventures.",
      description: "Forest trails and hot springs in Parvati Valley.",
      coverImage: "/images/treks/camp-1.jpg",
      trekCount: 8,
      bestSeasons: ["spring", "summer", "autumn"],
      altitudeRange: { min: 5000, max: 17400 },
      highlights: ["Kheerganga", "Sar Pass"],
      status: "published",
    },
  ];

  for (const dest of destinations) {
    await DestinationModel.findOneAndUpdate(
      { slug: dest.slug },
      { ...dest, deletedAt: null },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  }
  logger.info("Destinations seeded", { count: destinations.length });

  await CategoryModel.findOneAndUpdate(
    { slug: "weekend-treks" },
    {
      slug: "weekend-treks",
      name: "Weekend Treks",
      type: "trek",
      description: "Short Himalayan escapes",
      deletedAt: null,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  await SettingModel.findOneAndUpdate(
    { key: "site.name" },
    { key: "site.name", value: "India Holiday Destinations", group: "general" },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  await SettingModel.findOneAndUpdate(
    { key: "site.currency" },
    { key: "site.currency", value: "INR", group: "general" },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  logger.info("Seed complete");
  await disconnectDatabase();
}

seed().catch(async (error) => {
  logger.error("Seed failed", { error });
  await disconnectDatabase();
  process.exit(1);
});
