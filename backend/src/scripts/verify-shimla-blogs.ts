import { connectDatabase, disconnectDatabase } from "../database/connection";
import { BlogModel } from "../models/Blog.model";
import { TrekModel } from "../models/Trek.model";
import { DestinationModel } from "../models/Destination.model";

async function main() {
  await connectDatabase();
  const shimlaPublished = await BlogModel.countDocuments({
    category: "Shimla",
    status: "published",
    deletedAt: null,
  });
  const sample = await BlogModel.findOne({ slug: "best-places-to-visit-in-shimla" })
    .select("slug title readingTimeMinutes seo relatedTreks relatedBlogs faq content")
    .lean();
  const packages = await TrekModel.countDocuments({
    destinationName: "Shimla",
    status: "published",
    deletedAt: null,
  });
  const destination = await DestinationModel.findOne({ slug: "shimla" }).select("slug name trekCount status").lean();
  const wordCount = sample?.content ? sample.content.trim().split(/\s+/).length : 0;
  console.log(
    JSON.stringify(
      {
        shimlaPublished,
        packages,
        destination,
        sample: {
          slug: sample?.slug,
          title: sample?.title,
          readingTimeMinutes: sample?.readingTimeMinutes,
          wordCount,
          seoTitle: sample?.seo && "title" in sample.seo ? sample.seo.title : null,
          focusKeyword: sample?.seo && "focusKeyword" in sample.seo ? sample.seo.focusKeyword : null,
          seoScore: sample?.seo && "seoScore" in sample.seo ? sample.seo.seoScore : null,
          canonical: sample?.seo && "canonical" in sample.seo ? sample.seo.canonical : null,
          faqCount: sample?.faq?.length || 0,
          relatedTreks: sample?.relatedTreks?.length || 0,
          relatedBlogs: sample?.relatedBlogs?.length || 0,
        },
      },
      null,
      2,
    ),
  );
  await disconnectDatabase();
}

main().catch(async (e) => {
  console.error(e);
  await disconnectDatabase();
  process.exit(1);
});
