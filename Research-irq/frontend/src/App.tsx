import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { RequireRole } from './components/auth/RequireRole';
import { LoadingFallback } from './components/LoadingFallback';

// Public pages — code-split per route
const Home = lazy(() => import('./pages/public/Home'));
const ResearchIndex = lazy(() => import('./pages/public/ResearchIndex'));
const ResearchDetail = lazy(() => import('./pages/public/ResearchDetail'));
const People = lazy(() => import('./pages/public/People'));
const PersonDetail = lazy(() => import('./pages/public/PersonDetail'));
const Topics = lazy(() => import('./pages/public/Topics'));
const Events = lazy(() => import('./pages/public/Events'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const NotFound = lazy(() => import('./pages/public/NotFound'));

// Admin pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminArticles = lazy(() => import('./pages/admin/Articles'));
const AdminArticleEditor = lazy(() => import('./pages/admin/ArticleEditor'));
const AdminMedia = lazy(() => import('./pages/admin/Media'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminAudit = lazy(() => import('./pages/admin/Audit'));

export function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public site */}
        <Route element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="research" element={<ResearchIndex />} />
          <Route path="research/:slug" element={<ResearchDetail />} />
          <Route path="people" element={<People />} />
          <Route path="people/:slug" element={<PersonDetail />} />
          <Route path="topics" element={<Topics />} />
          <Route path="topics/:slug" element={<Topics />} />
          <Route path="events" element={<Events />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin app */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route
          path="admin"
          element={
            <RequireRole role="admin">
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="articles/:id" element={<AdminArticleEditor />} />
          <Route path="media" element={<AdminMedia />} />
          <Route
            path="users"
            element={
              <RequireRole role="super">
                <AdminUsers />
              </RequireRole>
            }
          />
          <Route
            path="audit"
            element={
              <RequireRole role="super">
                <AdminAudit />
              </RequireRole>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
