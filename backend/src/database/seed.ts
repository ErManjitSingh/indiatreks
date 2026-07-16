import bcrypt from "bcryptjs";
import { connectDatabase, disconnectDatabase } from "./connection";
import { env } from "../config/env";
import { UserModel } from "../models/User.model";
import { DestinationModel } from "../models/Destination.model";
import { SettingModel } from "../models/Setting.model";
import { CategoryModel } from "../models/Category.model";
import { logger } from "../utils/logger";

type DestSeed = {
  slug: string;
  name: string;
  region: string;
  state: string;
  summary: string;
  description: string;
  coverImage: string;
  highlights: string[];
};

const destinations: DestSeed[] = [
  {
    slug: "dharamshala",
    name: "Dharamshala",
    region: "Dhauladhar Range",
    state: "Himachal Pradesh",
    summary: "Triund, Kareri, Indrahar and classic Dhauladhar treks.",
    description: "Gateway to the Dhauladhar wall — weekend ridges to alpine passes.",
    coverImage: "/images/treks/hero.jpg",
    highlights: ["Triund", "Kareri Lake", "Indrahar Pass", "Toral Pass"],
  },
  {
    slug: "kangra",
    name: "Kangra",
    region: "Dhauladhar Range",
    state: "Himachal Pradesh",
    summary: "Lam Dal, Chamunda and Bara Bhangal access trails.",
    description: "Kangra valley trailheads for sacred lakes and long crossings.",
    coverImage: "/images/treks/landscape-1.jpg",
    highlights: ["Lam Dal", "Chamunda", "Bara Bhangal"],
  },
  {
    slug: "manali",
    name: "Manali",
    region: "Kullu Valley",
    state: "Himachal Pradesh",
    summary: "Hampta, Bhrigu, Beas Kund and high Manali classics.",
    description: "Kullu–Manali base for meadows, passes and glacier walks.",
    coverImage: "/images/treks/mountains-1.jpg",
    highlights: ["Hampta Pass", "Bhrigu Lake", "Beas Kund", "Friendship Peak"],
  },
  {
    slug: "naggar",
    name: "Naggar",
    region: "Kullu Valley",
    state: "Himachal Pradesh",
    summary: "Chandrakhani Pass and quiet Kullu ridge walks.",
    description: "Heritage village base for Chandrakhani and Malana connections.",
    coverImage: "/images/treks/landscape-2.jpg",
    highlights: ["Chandrakhani Pass"],
  },
  {
    slug: "kasol",
    name: "Kasol",
    region: "Parvati Valley",
    state: "Himachal Pradesh",
    summary: "Kheerganga, Sar Pass, Rasol and Parvati forest trails.",
    description: "Parvati Valley café town and trek hub.",
    coverImage: "/images/treks/camp-1.jpg",
    highlights: ["Kheerganga", "Sar Pass", "Rasol", "Grahan"],
  },
  {
    slug: "parvati-valley",
    name: "Parvati Valley",
    region: "Parvati Valley",
    state: "Himachal Pradesh",
    summary: "Tosh and riverside village treks in Parvati.",
    description: "Scenic villages and forest walks along the Parvati river.",
    coverImage: "/images/treks/forest-1.jpg",
    highlights: ["Tosh"],
  },
  {
    slug: "malana",
    name: "Malana",
    region: "Parvati Valley",
    state: "Himachal Pradesh",
    summary: "Waichin Valley and remote Malana-side routes.",
    description: "Ancient village trails and Magic Valley approaches.",
    coverImage: "/images/treks/forest-2.jpg",
    highlights: ["Waichin Valley"],
  },
  {
    slug: "kullu",
    name: "Kullu",
    region: "Kullu Valley",
    state: "Himachal Pradesh",
    summary: "Malana, Bijli Mahadev, Shrikhand and Pin Parvati.",
    description: "Broad Kullu district trailheads for sacred and expedition treks.",
    coverImage: "/images/treks/mountains-2.jpg",
    highlights: ["Bijli Mahadev", "Malana", "Shrikhand Mahadev"],
  },
  {
    slug: "banjar",
    name: "Banjar",
    region: "Great Himalayan National Park",
    state: "Himachal Pradesh",
    summary: "Jalori, Bashleo and GHNP wilderness treks.",
    description: "Banjar–Tirthan gateway to GHNP and Jalori Pass.",
    coverImage: "/images/treks/meadow-1.jpg",
    highlights: ["Jalori Pass", "Bashleo Pass", "GHNP"],
  },
  {
    slug: "jalori-pass",
    name: "Jalori Pass",
    region: "Great Himalayan National Park",
    state: "Himachal Pradesh",
    summary: "Serolsar Lake day trek from Jalori Pass.",
    description: "High meadow day walks from Jalori.",
    coverImage: "/images/treks/landscape-3.jpg",
    highlights: ["Serolsar Lake"],
  },
  {
    slug: "jalori",
    name: "Jalori",
    region: "Great Himalayan National Park",
    state: "Himachal Pradesh",
    summary: "Raghupur Fort and Jalori ridge walks.",
    description: "Short heritage and meadow trails near Jalori.",
    coverImage: "/images/treks/mountains-3.jpg",
    highlights: ["Raghupur Fort"],
  },
  {
    slug: "chamba",
    name: "Chamba",
    region: "Pir Panjal",
    state: "Himachal Pradesh",
    summary: "Kugti Pass and Sach Pass alpine crossings.",
    description: "Chamba district high passes and shepherd trails.",
    coverImage: "/images/treks/mountains-1.jpg",
    highlights: ["Kugti Pass", "Sach Pass"],
  },
  {
    slug: "bharmour",
    name: "Bharmour",
    region: "Pir Panjal",
    state: "Himachal Pradesh",
    summary: "Manimahesh Kailash pilgrimage trek.",
    description: "Sacred Manimahesh yatra base in Bharmour.",
    coverImage: "/images/treks/india-1.jpg",
    highlights: ["Manimahesh Kailash"],
  },
  {
    slug: "kinnaur",
    name: "Kinnaur",
    region: "Kinnaur",
    state: "Himachal Pradesh",
    summary: "Rupin, Bhaba, Charang, Borasu and Lamkhaga.",
    description: "High Kinnaur passes linking Garhwal and Spiti.",
    coverImage: "/images/treks/mountains-2.jpg",
    highlights: ["Rupin Pass", "Bhaba Pass", "Charang Valley"],
  },
  {
    slug: "kalpa",
    name: "Kalpa",
    region: "Kinnaur",
    state: "Himachal Pradesh",
    summary: "Kinner Kailash circuit from Kalpa.",
    description: "Kinnaur Kailash views and sacred circuit trails.",
    coverImage: "/images/treks/landscape-1.jpg",
    highlights: ["Kinner Kailash"],
  },
  {
    slug: "janglik",
    name: "Janglik",
    region: "Kinnaur",
    state: "Himachal Pradesh",
    summary: "Buran Ghati trailhead at Janglik.",
    description: "Classic Buran Ghati start village.",
    coverImage: "/images/treks/camp-1.jpg",
    highlights: ["Buran Ghati"],
  },
  {
    slug: "sirmaur",
    name: "Sirmaur",
    region: "Sirmaur",
    state: "Himachal Pradesh",
    summary: "Churdhar Peak — highest in southern Himachal.",
    description: "Forest ridge trek to Churdhar temple peak.",
    coverImage: "/images/treks/forest-1.jpg",
    highlights: ["Churdhar Peak"],
  },
  {
    slug: "spiti",
    name: "Spiti",
    region: "Spiti Valley",
    state: "Himachal Pradesh",
    summary: "Parang La, Pin Bhaba, Kanamo, Chandratal and more.",
    description: "Cold desert high passes, lakes and village trails.",
    coverImage: "/images/treks/mountains-3.jpg",
    highlights: ["Chandratal", "Kanamo Peak", "Parang La", "Dhankar Lake"],
  },
  {
    slug: "pin-valley",
    name: "Pin Valley",
    region: "Spiti Valley",
    state: "Himachal Pradesh",
    summary: "Mudh Village and Pin Valley walks.",
    description: "Quiet Pin Valley villages and valley floors.",
    coverImage: "/images/treks/meadow-1.jpg",
    highlights: ["Mudh Village"],
  },
];

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

  for (const dest of destinations) {
    await DestinationModel.findOneAndUpdate(
      { slug: dest.slug },
      {
        ...dest,
        trekCount: 0,
        bestSeasons: ["spring", "summer", "autumn"],
        altitudeRange: { min: 4000, max: 19000 },
        gallery: [dest.coverImage],
        status: "published",
        deletedAt: null,
      },
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
