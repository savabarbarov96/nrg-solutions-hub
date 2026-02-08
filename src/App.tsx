import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import SolarForHome from "./pages/SolarForHome";
import SolarForBusiness from "./pages/SolarForBusiness";
import Pricing from "./pages/Pricing";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Promos from "./pages/Promos";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/услуги" element={<Services />} />
          <Route path="/фотоволтаици-за-дома" element={<SolarForHome />} />
          <Route path="/фотоволтаици-за-бизнес" element={<SolarForBusiness />} />
          <Route path="/цени" element={<Pricing />} />
          <Route path="/проекти" element={<Projects />} />
          <Route path="/проекти/:slug" element={<ProjectDetails />} />
          <Route path="/промоции" element={<Promos />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/за-нас" element={<About />} />
          <Route path="/контакти" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
