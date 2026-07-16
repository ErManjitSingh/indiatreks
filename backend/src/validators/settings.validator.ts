import { z } from "zod";

export const upsertSettingSchema = z.object({
  key: z.string().min(1),
  value: z.unknown(),
  group: z.string().optional(),
});

export const bulkUpsertSettingsSchema = z.object({
  settings: z.array(upsertSettingSchema).min(1),
});
