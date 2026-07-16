import { TrekModel } from "../models/Trek.model";
import { BookingModel } from "../models/Booking.model";
import { UserModel } from "../models/User.model";
import { EnquiryModel } from "../models/Enquiry.model";
import { ReviewModel } from "../models/Review.model";

async function getDashboardStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    totalTreks,
    publishedTreks,
    totalBookings,
    confirmedBookings,
    pendingBookings,
    totalUsers,
    newEnquiries,
    pendingReviews,
    revenueAgg,
    revenueThisMonthAgg,
    revenueLastMonthAgg,
    bookingsByStatus,
    topTreksAgg,
  ] = await Promise.all([
    TrekModel.countDocuments({}),
    TrekModel.countDocuments({ status: "published" }),
    BookingModel.countDocuments({}),
    BookingModel.countDocuments({ bookingStatus: "confirmed" }),
    BookingModel.countDocuments({ bookingStatus: "pending" }),
    UserModel.countDocuments({}),
    EnquiryModel.countDocuments({ status: "new" }),
    ReviewModel.countDocuments({ status: "pending" }),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: startOfLastMonth, $lt: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    BookingModel.aggregate([{ $group: { _id: "$bookingStatus", count: { $sum: 1 } } }]),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: "$trekTitle", bookings: { $sum: 1 }, revenue: { $sum: "$amount" } } },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
    ]),
  ]);

  return {
    treks: { total: totalTreks, published: publishedTreks },
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      pending: pendingBookings,
      byStatus: bookingsByStatus.map((b) => ({ status: b._id, count: b.count })),
    },
    users: { total: totalUsers },
    enquiries: { new: newEnquiries },
    reviews: { pending: pendingReviews },
    revenue: {
      total: revenueAgg[0]?.total ?? 0,
      thisMonth: revenueThisMonthAgg[0]?.total ?? 0,
      lastMonth: revenueLastMonthAgg[0]?.total ?? 0,
    },
    topTreks: topTreksAgg.map((t) => ({ title: t._id, bookings: t.bookings, revenue: t.revenue })),
  };
}

export const analyticsService = {
  getDashboardStats,
};
