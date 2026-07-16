import { FilterQuery } from "mongoose";
import { BaseRepository } from "./BaseRepository";
import { DestinationModel, IDestination } from "../models/Destination.model";

export class DestinationRepository extends BaseRepository<IDestination> {
  constructor() {
    super(DestinationModel);
  }

  async findBySlug(slug: string, includeUnpublished = false) {
    const query: FilterQuery<IDestination> = { slug: slug.toLowerCase().trim() };
    if (!includeUnpublished) query.status = "published";
    return this.model.findOne(query);
  }

  async slugExists(slug: string, excludeId?: string) {
    const query: FilterQuery<IDestination> = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    return (await this.model.countDocuments(query)) > 0;
  }
}

export const destinationRepository = new DestinationRepository();
