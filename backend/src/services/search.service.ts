import { TrekModel } from "../models/Trek.model";
import { BlogModel } from "../models/Blog.model";
import { DestinationModel } from "../models/Destination.model";

interface SearchOptions {
  q: string;
  limit?: number;
  types?: string[];
}

async function globalSearch({ q, limit = 10, types }: SearchOptions) {
  const shouldSearch = (type: string) => !types || types.includes(type);
  const regex = new RegExp(q, "i");

  const [treks, blogs, destinations] = await Promise.all([
    shouldSearch("treks")
      ? TrekModel.find({
          status: "published",
          $or: [{ title: regex }, { summary: regex }, { destinationName: regex }, { location: regex }],
        })
          .select("slug title summary destinationName heroImages basePriceInr")
          .limit(limit)
      : Promise.resolve([]),
    shouldSearch("blogs")
      ? BlogModel.find({ status: "published", $or: [{ title: regex }, { excerpt: regex }] })
          .select("slug title excerpt coverImage")
          .limit(limit)
      : Promise.resolve([]),
    shouldSearch("destinations")
      ? DestinationModel.find({ status: "published", $or: [{ name: regex }, { summary: regex }] })
          .select("slug name summary coverImage")
          .limit(limit)
      : Promise.resolve([]),
  ]);

  return {
    treks: treks.map((t) => ({ type: "trek", slug: t.slug, title: t.title, summary: t.summary, image: t.heroImages?.[0], price: t.basePriceInr })),
    blogs: blogs.map((b) => ({ type: "blog", slug: b.slug, title: b.title, summary: b.excerpt, image: b.coverImage })),
    destinations: destinations.map((d) => ({ type: "destination", slug: d.slug, title: d.name, summary: d.summary, image: d.coverImage })),
    total: treks.length + blogs.length + destinations.length,
  };
}

export const searchService = {
  globalSearch,
};
