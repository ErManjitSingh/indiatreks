import { FilterQuery } from "mongoose";
import { BaseRepository } from "./BaseRepository";
import { ITrek, TrekModel } from "../models/Trek.model";

export interface TrekListFilters {
  q?: string;
  destination?: string;
  region?: string;
  state?: string;
  difficulty?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  trekType?: string;
  season?: string;
}

export class TrekRepository extends BaseRepository<ITrek> {
  constructor() {
    super(TrekModel);
  }

  buildFilterQuery(filters: TrekListFilters): FilterQuery<ITrek> {
    const query: FilterQuery<ITrek> = { deletedAt: null };
    const and: FilterQuery<ITrek>[] = [];

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.destination) {
      const dest = String(filters.destination);
      const expand: Record<string, string> = {
        Dharamshala: "Dharamshala",
        Manali: "Manali",
        Kasol: "Parvati Valley",
        "Parvati Valley": "Parvati Valley",
        Banjar: "Banjar",
        Chamba: "Chamba",
        Kinnaur: "Kinnaur",
        Spiti: "Spiti",
      };
      const region = expand[dest];
      if (region) {
        and.push({
          $or: [
            { destinationName: new RegExp(`^${dest}$`, "i") },
            { region: new RegExp(`^${region}$`, "i") },
          ],
        });
      } else {
        query.destinationName = new RegExp(dest, "i");
      }
    }
    if (filters.region) {
      query.region = new RegExp(`^${filters.region}$`, "i");
    }
    if (filters.state) {
      query.state = new RegExp(`^${filters.state}$`, "i");
    }
    if (filters.difficulty) {
      query.difficulty = filters.difficulty as ITrek["difficulty"];
    }
    if (filters.trekType) {
      query.trekTypes = filters.trekType as never;
    }
    if (filters.season) {
      query.bestSeasons = filters.season as never;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.basePriceInr = {
        ...(filters.minPrice !== undefined ? { $gte: filters.minPrice } : {}),
        ...(filters.maxPrice !== undefined ? { $lte: filters.maxPrice } : {}),
      };
    }
    if (filters.q) {
      and.push({
        $or: [
          { title: new RegExp(filters.q, "i") },
          { slug: new RegExp(filters.q, "i") },
          { summary: new RegExp(filters.q, "i") },
          { destinationName: new RegExp(filters.q, "i") },
          { location: new RegExp(filters.q, "i") },
          { region: new RegExp(filters.q, "i") },
        ],
      });
    }

    if (and.length) {
      query.$and = and;
    }

    return query;
  }

  async findBySlug(slug: string, includeUnpublished = false) {
    const query: FilterQuery<ITrek> = { slug: slug.toLowerCase().trim() };
    if (!includeUnpublished) query.status = "published";
    return this.model.findOne(query);
  }

  async slugExists(slug: string, excludeId?: string) {
    const query: FilterQuery<ITrek> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const count = await this.model.countDocuments(query);
    return count > 0;
  }
}

export const trekRepository = new TrekRepository();
