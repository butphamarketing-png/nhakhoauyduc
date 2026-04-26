import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import LoginPage from "@/pages/admin/LoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import {
  AboutPage,
  ContactPage,
  HomePage,
  KnowledgePage,
  NewsPage,
  PostDetailPage,
  PromotionsPage,
  ReviewsPage,
  ServiceDetailPage,
  ServicesPage,
} from "@/pages/public/SitePages";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/gioi-thieu" component={AboutPage} />
      <Route path="/dich-vu" component={ServicesPage} />
      <Route path="/dich-vu/:slug" component={ServiceDetailPage} />
      <Route path="/kien-thuc" component={KnowledgePage} />
      <Route path="/kien-thuc/:slug" component={PostDetailPage} />
      <Route path="/tin-tuc" component={NewsPage} />
      <Route path="/tin-tuc/:slug" component={PostDetailPage} />
      <Route path="/khuyen-mai" component={PromotionsPage} />
      <Route path="/nhan-xet" component={ReviewsPage} />
      <Route path="/lien-he" component={ContactPage} />
      <Route path="/admin/login" component={LoginPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/:page" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
