import { Schema } from "mongoose";

/**
 * Adds a `deletedAt` field and transparently filters it out of find queries
 * unless the caller explicitly includes `deletedAt` in the query conditions.
 */
export function softDeletePlugin(schema: Schema): void {
  if (!schema.path("deletedAt")) {
    schema.add({ deletedAt: { type: Date, default: null, index: true } });
  }

  const findHooks = [
    "find",
    "findOne",
    "findOneAndUpdate",
    "findOneAndDelete",
    "countDocuments",
    "count",
  ] as const;

  findHooks.forEach((hook) => {
    schema.pre(hook as never, function (this: any, next: (err?: unknown) => void) {
      const conditions = this.getQuery ? this.getQuery() : {};
      if (!Object.prototype.hasOwnProperty.call(conditions, "deletedAt")) {
        this.where({ deletedAt: null });
      }
      next();
    });
  });

  schema.methods.softDelete = function softDelete(this: { deletedAt?: Date | null; save: () => Promise<unknown> }) {
    this.deletedAt = new Date();
    return this.save();
  };

  schema.methods.restore = function restore(this: { deletedAt?: Date | null; save: () => Promise<unknown> }) {
    this.deletedAt = null;
    return this.save();
  };
}
