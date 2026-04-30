import { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WorkflowOutputProvider } from "@/lib/workflow-output-context";
import { AppLayout } from "@/components/layout/AppLayout";
import PublicLayout from "@/components/layout/PublicLayout"; // Import PublicLayout
import { Button } from "@/components/ui/button"; // Import Button
import { CompanyProvider } from "./lib/company-context";
import Index from "./pages/Index"; // Our dashboard page
import About from "./pages/About";   // The new public info page
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import ExternalApp from "./pages/ExternalApp";
import Launcher from "./pages/Launcher";
import Agents from "./pages/Agents";
import Workflows from "./pages/Workflows";
import WorkflowEditor from "./pages/WorkflowEditor";
import WorkflowOutput from "./pages/WorkflowOutput";
import Permissions from "./pages/Permissions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import ImportAgents from "./pages/ImportAgents";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyList from "./pages/CompanyList";
import CompanyTeams from "./pages/CompanyTeams";
import CompanyTeamDetail from "./pages/CompanyTeamDetail";
import CompanyAgents from "./pages/CompanyAgents";
import CompanyIssues from "./pages/CompanyIssues";
import CompanyActivity from "./pages/CompanyActivity";
import CompanyReports from "./pages/CompanyReports";

import Inbox from "./pages/Inbox";

// Helper to check authentication status
const checkAuth = () => {
  return localStorage.getItem('ensemble_auth_token') !== null;
};

// Component to handle root route redirection based on auth status
const PublicRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (checkAuth()) {
      // If authenticated, redirect to dashboard (Index page)
      if (location.pathname === '/') {
        navigate('/dashboard'); // Or wherever the main dashboard is, if not just '/'
      }
    } else {
      // If not authenticated, and not on auth/about page, show a public landing
      if (location.pathname !== '/auth' && location.pathname !== '/about') {
        // We'll render a simple public landing here. Could also redirect to /about
        // For now, let's just show a placeholder.
        navigate('/landing'); // New route for simplified public landing
      }
    }
  }, [navigate, location.pathname]);

  return (
    <PublicLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<SimplifiedPublicLanding />} /> {/* New simplified landing */} 
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        {/* Redirect root to landing if not authenticated */}
        <Route path="/" element={checkAuth() ? <Index /> : <Navigate to="/landing" replace />} />

        {/* Protected Routes - these will be under AppLayout */}
        {/* Rendered by the parent Route element in the main Routes */}
        {/* The 'Index' route below is now conceptually the main dashboard after auth */}
        <Route path="/dashboard" element={<Index />} /> {/* Explicitly map to dashboard */}
        <Route path="/chat" element={<Chat />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/launcher" element={<Launcher />} />
        <Route path="/app/:appId" element={<ExternalApp />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/import" element={<ImportAgents />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/workflows/:id" element={<WorkflowEditor />} />
        <Route path="/workflow-output/:id" element={<WorkflowOutput />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/settings/*" element={<Settings />} />
        {/* Companies */}
        <Route path="/companies" element={<CompanyList />} />
        <Route path="/company/:id" element={<CompanyDashboard />} />
        <Route path="/company/:id/teams" element={<CompanyTeams />} />
        <Route path="/company/:id/teams/:teamId" element={<CompanyTeamDetail />} />
        <Route path="/company/:id/agents" element={<CompanyAgents />} />
        <Route path="/company/:id/issues" element={<CompanyIssues />} />
        <Route path="/company/:id/activity" element={<CompanyActivity />} />
        <Route path="/company/:id/reports" element={<CompanyReports />} />

        {/* Catch-all for not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PublicLayout>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkflowOutputProvider>
        <CompanyProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Routes that are always under AppLayout (protected) */}
              <Route element={<AppLayout />}>
                {/* These are the core application routes, now accessible after auth */}
                {/* We've moved the root '/' to PublicRoot for conditional logic */}
                {/* <Route path="/" element={<Index />} /> */}
                {/* Redirect / to /dashboard if authenticated */}
                <Route path="/dashboard" element={<Index />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/launcher" element={<Launcher />} />
                <Route path="/app/:appId" element={<ExternalApp />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/marketplace/import" element={<ImportAgents />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/workflows/:id" element={<WorkflowEditor />} />
                <Route path="/workflow-output/:id" element={<WorkflowOutput />} />
                <Route path="/permissions" element={<Permissions />} />
                <Route path="/settings/*" element={<Settings />} />
                {/* Companies */}
                <Route path="/companies" element={<CompanyList />} />
                <Route path="/company/:id" element={<CompanyDashboard />} />
                <Route path="/company/:id/teams" element={<CompanyTeams />} />
                <Route path="/company/:id/teams/:teamId" element={<CompanyTeamDetail />} />
                <Route path="/company/:id/agents" element={<CompanyAgents />} />
                <Route path="/company/:id/issues" element={<CompanyIssues />} />
                <Route path="/company/:id/activity" element={<CompanyActivity />} />
                <Route path="/company/:id/reports" element={<CompanyReports />} />
              </Route>

              {/* Public routes are handled by PublicRoot */}
              <Route path="/*" element={<PublicRoot />} />
              
            </Routes>
          </BrowserRouter>
        </CompanyProvider>
      </WorkflowOutputProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// --- Simplified Public Landing Page Component ---
const SimplifiedPublicLanding = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center flex flex-col items-center justify-center h-full px-4">
      <h2 className="text-4xl font-black text-foreground mb-4">Welcome to Ensemble</h2>
      <p className="text-lg text-muted-foreground mb-6 max-w-xl">Discover how Ensemble can automate your team's workflows and boost productivity with intelligent AI agents.</p>
      <div className="flex gap-4">
        <Button size="lg" variant="default" className="rounded-xl shadow-md hover:scale-105 transition-transform" onClick={() => navigate('/about')}>Learn More</Button>
        <Button size="lg" variant="outline" className="rounded-xl shadow-md hover:scale-105 transition-transform border-white/20 bg-white/5" onClick={() => navigate('/auth')}>Get Started</Button>
      </div>
    </div>
  );
};

export default App;
