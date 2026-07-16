import { ContactModel, IContact } from "../models/Contact.model";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  status?: string;
}

async function create(data: Pick<IContact, "name" | "email" | "phone" | "subject" | "message">) {
  return ContactModel.create(data);
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;

  const [items, total] = await Promise.all([
    ContactModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const contact = await ContactModel.findById(id);
  if (!contact) throw new ApiError(404, "Contact message not found", "CONTACT_NOT_FOUND");
  return contact;
}

async function updateStatus(id: string, status: IContact["status"]) {
  const contact = await ContactModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!contact) throw new ApiError(404, "Contact message not found", "CONTACT_NOT_FOUND");
  return contact;
}

async function softDelete(id: string) {
  const contact = await ContactModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!contact) throw new ApiError(404, "Contact message not found", "CONTACT_NOT_FOUND");
  return contact;
}

export const contactService = {
  create,
  list,
  getById,
  updateStatus,
  softDelete,
};
