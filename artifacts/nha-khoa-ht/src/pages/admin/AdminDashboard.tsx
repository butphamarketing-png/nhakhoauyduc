import { useParams } from "wouter";
import { DashboardOverview } from "./pages/DashboardOverview";
import { BannersAdmin } from "./pages/BannersAdmin";
import { ServicesAdmin } from "./pages/ServicesAdmin";
import { PromotionsAdmin } from "./pages/PromotionsAdmin";
import { FeedbackAdmin } from "./pages/FeedbackAdmin";
import { PostsAdmin } from "./pages/PostsAdmin";
import { BookingsAdmin } from "./pages/BookingsAdmin";
import { SettingsAdmin } from "./pages/SettingsAdmin";

export default function AdminDashboard() {
  const params = useParams<{ page?: string }>();
  const page = params.page || "";

  switch (page) {
    case "banners":
      return <BannersAdmin />;
    case "services":
      return <ServicesAdmin />;
    case "promotions":
      return <PromotionsAdmin />;
    case "feedback":
      return <FeedbackAdmin />;
    case "posts":
      return <PostsAdmin />;
    case "bookings":
      return <BookingsAdmin />;
    case "settings":
      return <SettingsAdmin />;
    default:
      return <DashboardOverview />;
  }
}
