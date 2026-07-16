import { BaseRepository } from "./BaseRepository";
import { BookingModel, IBooking } from "../models/Booking.model";

export class BookingRepository extends BaseRepository<IBooking> {
  constructor() {
    super(BookingModel);
  }

  async findByCode(bookingCode: string) {
    return this.model.findOne({ bookingCode }).populate("trek", "title slug heroImages");
  }

  async findByIdPopulated(id: string) {
    return this.model.findById(id).populate("trek", "title slug heroImages");
  }

  async generateUniqueCode(): Promise<string> {
    let code = "";
    let exists = true;
    while (exists) {
      code = `IHD${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 900 + 100)}`;
      exists = (await this.model.countDocuments({ bookingCode: code })) > 0;
    }
    return code;
  }
}

export const bookingRepository = new BookingRepository();
