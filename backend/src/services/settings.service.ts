import { SettingModel } from "../models/Setting.model";

async function getAll(group?: string) {
  const filter = group ? { group } : {};
  const settings = await SettingModel.find(filter).sort({ key: 1 });
  return settings.reduce<Record<string, unknown>>((acc, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
}

async function getByKey(key: string) {
  const setting = await SettingModel.findOne({ key });
  return setting?.value ?? null;
}

async function upsert(key: string, value: unknown, group?: string) {
  return SettingModel.findOneAndUpdate({ key }, { key, value, group }, { new: true, upsert: true });
}

async function bulkUpsert(settings: Array<{ key: string; value: unknown; group?: string }>) {
  const operations = settings.map((s) => ({
    updateOne: {
      filter: { key: s.key },
      update: { $set: { key: s.key, value: s.value, group: s.group } },
      upsert: true,
    },
  }));
  await SettingModel.bulkWrite(operations);
  return getAll();
}

export const settingsService = {
  getAll,
  getByKey,
  upsert,
  bulkUpsert,
};
