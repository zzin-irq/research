import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { LoadingFallback } from './components/LoadingFallback';

const Home          = lazy(() => import('./pages/public/Home'));
const ResearchIndex = lazy(() => import('./pages/public/ResearchIndex'));
const ResearchDetail = lazy(() => import('./pages/public/ResearchDetail'));
const People        = lazy(() => import('./pages/public/People'));
const PersonDetail  = lazy(() => import('./pages/public/PersonDetail'));
const Topics        = lazy(() => import('./pages/public/Topics'));
const Events        = lazy(() => import('./pages/public/Events'));
const About         = lazy(() => import('./pages/public/About'));
const Contact       = lazy(() => import('./pages/public/Contact'));
const NotFound      = lazy(() => import('./pages/public/NotFound'));

export function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
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
      </Routes>
    </Suspense>
  );
}
