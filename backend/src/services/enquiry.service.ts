import { EnquiryModel, IEnquiry } from "../models/Enquiry.model";
import { emailService } from "./email.service";
import { getPagination, paginateMeta } from "../utils/pagination";
import { ApiError } from "../utils/ApiError";

interface ListQuery {
  page?: number;
  limit?: number;
  status?: string;
  q?: string;
}

async function create(data: Pick<IEnquiry, "name" | "email" | "phone" | "trekSlug" | "trekTitle" | "preferredDate" | "travelers" | "message">) {
  const enquiry = await EnquiryModel.create(data);
  await emailService.sendEnquiryNotificationEmail({
    name: data.name,
    email: data.email,
    phone: data.phone,
    trekTitle: data.trekTitle,
    message: data.message,
  });
  return enquiry;
}

async function list(query: ListQuery) {
  const { page, limit, skip } = getPagination(query as Record<string, unknown>);
  const filter: Record<string, unknown> = {};
  if (query.status) filter.status = query.status;
  if (query.q) {
    filter.$or = [
      { name: new RegExp(query.q, "i") },
      { email: new RegExp(query.q, "i") },
      { trekTitle: new RegExp(query.q, "i") },
    ];
  }

  const [items, total] = await Promise.all([
    EnquiryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    EnquiryModel.countDocuments(filter),
  ]);
  return { items, meta: paginateMeta(total, page, limit) };
}

async function getById(id: string) {
  const enquiry = await EnquiryModel.findById(id);
  if (!enquiry) throw new ApiError(404, "Enquiry not found", "ENQUIRY_NOT_FOUND");
  return enquiry;
}

async function updateStatus(id: string, status: IEnquiry["status"]) {
  const enquiry = await EnquiryModel.findByIdAndUpdate(id, { status }, { new: true });
  if (!enquiry) throw new ApiError(404, "Enquiry not found", "ENQUIRY_NOT_FOUND");
  return enquiry;
}

async function softDelete(id: string) {
  const enquiry = await EnquiryModel.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
  if (!enquiry) throw new ApiError(404, "Enquiry not found", "ENQUIRY_NOT_FOUND");
  return enquiry;
}

export const enquiryService = {
  create,
  list,
  getById,
  updateStatus,
  softDelete,
};
