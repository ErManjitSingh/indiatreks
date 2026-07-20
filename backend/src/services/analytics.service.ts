import { TrekModel } from "../models/Trek.model";
import { BookingModel } from "../models/Booking.model";
import { UserModel } from "../models/User.model";
import { EnquiryModel } from "../models/Enquiry.model";
import { ReviewModel } from "../models/Review.model";
import { DestinationModel } from "../models/Destination.model";
import { FaqModel } from "../models/Faq.model";
import { BlogModel } from "../models/Blog.model";
import { CategoryModel } from "../models/Category.model";
import { MediaModel } from "../models/Media.model";
import { SettingModel } from "../models/Setting.model";
import { TestimonialModel } from "../models/Testimonial.model";
import { googleAnalyticsDataService } from "./googleAnalyticsData.service";
import { logger } from "../utils/logger";

function startOfUtcDay(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function daysAgoUtc(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return startOfUtcDay(d);
}

function formatRelativeTime(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

async function dailyCreates(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: { aggregate: (pipeline: any[]) => Promise<Array<{ _id: string; count: number }>> },
  since: Date,
) {
  return model.aggregate([
    { $match: { deletedAt: null, createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
}

function fillDailySeries(
  days: number,
  ...series: Array<Array<{ _id: string; count: number }>>
) {
  const map = new Map<string, number>();
  for (const rows of series) {
    for (const row of rows) {
      map.set(row._id, (map.get(row._id) || 0) + row.count);
    }
  }
  const out: Array<{ date: string; count: number }> = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = daysAgoUtc(i);
    const key = d.toISOString().slice(0, 10);
    out.push({ date: key, count: map.get(key) || 0 });
  }
  return out;
}

async function getDashboardStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const since30 = daysAgoUtc(29);

  const [
    totalTreks,
    publishedTreks,
    totalBookings,
    confirmedBookings,
    pendingBookings,
    totalUsers,
    newEnquiries,
    totalEnquiries,
    pendingReviews,
    destinationCount,
    faqCount,
    blogCount,
    publishedBlogCount,
    categoryCount,
    mediaCount,
    settingsCount,
    testimonialCount,
    blogViewsAgg,
    revenueAgg,
    revenueThisMonthAgg,
    revenueLastMonthAgg,
    bookingsByStatus,
    topTreksByBookingAgg,
    topTreksByRating,
    topBlogsByViews,
    recentTreks,
    recentBlogs,
    recentDestinations,
    recentMedia,
    recentFaqs,
    trekDaily,
    blogDaily,
    destinationDaily,
  ] = await Promise.all([
    TrekModel.countDocuments({ deletedAt: null }),
    TrekModel.countDocuments({ status: "published", deletedAt: null }),
    BookingModel.countDocuments({}),
    BookingModel.countDocuments({ bookingStatus: "confirmed" }),
    BookingModel.countDocuments({ bookingStatus: "pending" }),
    UserModel.countDocuments({}),
    EnquiryModel.countDocuments({ status: "new" }),
    EnquiryModel.countDocuments({}),
    ReviewModel.countDocuments({ status: "pending" }),
    DestinationModel.countDocuments({ deletedAt: null }),
    FaqModel.countDocuments({}).catch(() => 0),
    BlogModel.countDocuments({ deletedAt: null }),
    BlogModel.countDocuments({ status: "published", deletedAt: null }),
    CategoryModel.countDocuments({ deletedAt: null }).catch(() => 0),
    MediaModel.countDocuments({ deletedAt: null }).catch(() => 0),
    SettingModel.countDocuments({}).catch(() => 0),
    TestimonialModel.countDocuments({ deletedAt: null }).catch(() => 0),
    BlogModel.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$views", 0] } } } },
    ]),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid", createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    BookingModel.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfLastMonth, $lt: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
    BookingModel.aggregate([{ $group: { _id: "$bookingStatus", count: { $sum: 1 } } }]),
    BookingModel.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: "$trekTitle", bookings: { $sum: 1 }, revenue: { $sum: "$amount" } } },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
    ]),
    TrekModel.find({ deletedAt: null, status: "published" })
      .sort({ rating: -1, reviewCount: -1, createdAt: -1 })
      .limit(5)
      .select("title slug region destinationName rating reviewCount heroImages gallery")
      .lean(),
    BlogModel.find({ deletedAt: null })
      .sort({ views: -1, publishedAt: -1, createdAt: -1 })
      .limit(5)
      .select("title slug views coverImage category publishedAt")
      .lean(),
    TrekModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("title slug createdAt status")
      .lean(),
    BlogModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("title slug createdAt status")
      .lean(),
    DestinationModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("name slug createdAt")
      .lean(),
    MediaModel.find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .limit(4)
      .select("url alt folder createdAt")
      .lean(),
    FaqModel.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .select("question createdAt")
      .lean(),
    dailyCreates(TrekModel, since30),
    dailyCreates(BlogModel, since30),
    dailyCreates(DestinationModel, since30),
  ]);

  const activity = [
    ...recentTreks.map((t) => ({
      type: "trek" as const,
      title: `Trek added: ${t.title}`,
      href: `/admin/treks/${String(t._id)}/edit`,
      at: t.createdAt,
    })),
    ...recentBlogs.map((b) => ({
      type: "blog" as const,
      title:
        b.status === "published"
          ? `Blog published: ${b.title}`
          : `Blog drafted: ${b.title}`,
      href: `/admin/blogs/${String(b._id)}/edit`,
      at: b.createdAt,
    })),
    ...recentDestinations.map((d) => ({
      type: "destination" as const,
      title: `Destination added: ${String(d.name || d.slug || "Untitled")}`,
      href: `/admin/destinations/${String(d._id)}/edit`,
      at: d.createdAt,
    })),
    ...(recentMedia || []).map((m) => ({
      type: "media" as const,
      title: `Media uploaded${m.folder ? `: ${m.folder}` : ""}`,
      href: "/admin/media",
      at: m.createdAt,
    })),
    ...(recentFaqs || []).map((f) => ({
      type: "faq" as const,
      title: `FAQ updated: ${f.question}`,
      href: "/admin/faqs",
      at: f.createdAt,
    })),
  ]
    .filter((item) => item.at)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 8)
    .map((item) => ({
      type: item.type,
      title: item.title,
      href: item.href,
      at: new Date(item.at).toISOString(),
      relativeTime: formatRelativeTime(new Date(item.at)),
    }));

  const hasBookingTop = topTreksByBookingAgg.length > 0;
  const topTreks = hasBookingTop
    ? topTreksByBookingAgg.map((t, index) => ({
        rank: index + 1,
        title: String(t._id || "Untitled"),
        place: "",
        slug: "",
        metricLabel: "Bookings",
        metricValue: Number(t.bookings || 0),
        metricDisplay: String(t.bookings || 0),
        image: "",
      }))
    : topTreksByRating.map((t, index) => ({
        rank: index + 1,
        title: t.title,
        place: String(t.destinationName || t.region || ""),
        slug: t.slug || "",
        metricLabel: "Rating",
        metricValue: Number(t.rating || 0),
        metricDisplay:
          Number(t.reviewCount || 0) > 0
            ? `${Number(t.rating || 0).toFixed(1)} · ${t.reviewCount} reviews`
            : "Published",
        image: String(
          t.heroImages?.[0] ||
            (typeof t.gallery?.[0] === "string"
              ? t.gallery[0]
              : (t.gallery?.[0] as { url?: string } | undefined)?.url) ||
            "",
        ),
      }));

  const contentSeries = fillDailySeries(30, trekDaily, blogDaily, destinationDaily);
  const blogSeries = fillDailySeries(30, blogDaily);
  const trekSeries = fillDailySeries(30, trekDaily);

  let analytics: {
    connected: boolean;
    source: string;
    rangeDays: number;
    visitors: number;
    pageViews: number;
    enquiries: number;
    bounceRate: number | null;
    blogViews: number;
    series: Array<{ date: string; count: number }>;
  } = {
    connected: false,
    source: "mongo",
    rangeDays: 30,
    visitors: 0,
    pageViews: Number(blogViewsAgg[0]?.total ?? 0),
    enquiries: totalEnquiries,
    bounceRate: null,
    blogViews: Number(blogViewsAgg[0]?.total ?? 0),
    series: contentSeries,
  };

  try {
    const ga = await googleAnalyticsDataService.getDashboard(28, false);
    if (ga.connected && ga.source === "google") {
      analytics = {
        connected: true,
        source: "google",
        rangeDays: Number(ga.rangeDays || 28),
        visitors: Number(ga.totals?.users || 0),
        pageViews: Number(ga.totals?.sessions || 0),
        enquiries: totalEnquiries,
        bounceRate: Number(ga.totals?.bounceRate || 0),
        blogViews: Number(blogViewsAgg[0]?.total ?? 0),
        series: contentSeries,
      };
    }
  } catch (err) {
    logger.warn("Dashboard GA lookup skipped", {
      message: err instanceof Error ? err.message : "unknown",
    });
  }

  return {
    treks: { total: totalTreks, published: publishedTreks },
    content: {
      destinations: destinationCount,
      faqs: faqCount,
      blogs: blogCount,
      blogsPublished: publishedBlogCount,
      categories: categoryCount,
      media: mediaCount,
      settings: settingsCount,
      testimonials: testimonialCount,
      blogViews: Number(blogViewsAgg[0]?.total ?? 0),
    },
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      pending: pendingBookings,
      byStatus: bookingsByStatus.map((b) => ({ status: b._id, count: b.count })),
    },
    users: { total: totalUsers },
    enquiries: { new: newEnquiries, total: totalEnquiries },
    reviews: { pending: pendingReviews },
    revenue: {
      total: revenueAgg[0]?.total ?? 0,
      thisMonth: revenueThisMonthAgg[0]?.total ?? 0,
      lastMonth: revenueLastMonthAgg[0]?.total ?? 0,
    },
    topTreks,
    topBlogs: topBlogsByViews.map((b, index) => ({
      rank: index + 1,
      title: b.title,
      slug: b.slug || "",
      views: Number(b.views || 0),
      category: b.category || "",
      image: String(b.coverImage || ""),
    })),
    recentActivity: activity,
    series: {
      content: contentSeries,
      blogs: blogSeries,
      treks: trekSeries,
    },
    analytics,
  };
}

export const analyticsService = {
  getDashboardStats,
};
