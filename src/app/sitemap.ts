import { MetadataRoute } from "next";
import { roomCategories } from "@/data/rooms";
import { diningOutlets } from "@/data/dining";
import { offers } from "@/data/offers";
import { activities } from "@/data/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Static routes
  const staticRoutes = [
    "",
    "/stay",
    "/compare-rooms",
    "/dining",
    "/dining/menu",
    "/spa-wellness",
    "/experiences",
    "/amenities",
    "/offers",
    "/events",
    "/events/weddings",
    "/events/meetings",
    "/events/celebrations",
    "/transfers",
    "/location",
    "/policies",
    "/payments",
    "/directory",
    "/accessibility",
    "/families",
    "/safety",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Stay routes
  const roomRoutes = roomCategories.map((room) => ({
    url: `${baseUrl}/stay/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Dining routes
  const diningRoutes = diningOutlets.map((outlet) => ({
    url: `${baseUrl}/dining/${outlet.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Offer routes
  const offerRoutes = offers.map((offer) => ({
    url: `${baseUrl}/offers/${offer.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic Experience routes
  const activitySlugs = Array.from(new Set(activities.map((a) => a.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"))));
  const activityRoutes = activitySlugs.map((slug) => ({
    url: `${baseUrl}/experiences/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...roomRoutes, ...diningRoutes, ...offerRoutes, ...activityRoutes];
}
