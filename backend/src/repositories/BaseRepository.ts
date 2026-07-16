import {
  Model,
  Document,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  Types,
} from "mongoose";

export interface ListOptions {
  filter?: FilterQuery<any>;
  sort?: Record<string, 1 | -1>;
  skip?: number;
  limit?: number;
  select?: string;
  populate?: string | string[];
}

export class BaseRepository<T extends Document> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data as T);
  }

  async findById(id: string | Types.ObjectId, options: QueryOptions = {}): Promise<T | null> {
    return this.model.findById(id, undefined, options);
  }

  async findOne(filter: FilterQuery<T>, options: QueryOptions = {}): Promise<T | null> {
    return this.model.findOne(filter, undefined, options);
  }

  async findMany(options: ListOptions = {}): Promise<T[]> {
    const { filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 20, select, populate } = options;
    const query = this.model.find(filter).sort(sort).skip(skip).limit(limit);
    if (select) query.select(select);
    if (populate) query.populate(populate as string);
    return query.exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter);
  }

  async updateById(id: string | Types.ObjectId, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true, runValidators: true });
  }

  async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true, runValidators: true });
  }

  async softDeleteById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { deletedAt: new Date() } as UpdateQuery<T>, { new: true });
  }

  async restoreById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findOneAndUpdate({ _id: id, deletedAt: { $ne: null } } as FilterQuery<T>, {
      deletedAt: null,
    } as UpdateQuery<T>, { new: true });
  }

  async hardDeleteById(id: string | Types.ObjectId): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }

  async paginate(options: ListOptions = {}): Promise<{ items: T[]; total: number }> {
    const [items, total] = await Promise.all([
      this.findMany(options),
      this.count(options.filter ?? {}),
    ]);
    return { items, total };
  }
}
