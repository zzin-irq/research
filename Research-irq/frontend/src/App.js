import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { LoadingFallback } from './components/LoadingFallback';
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
export function App() {
    return (_jsx(Suspense, { fallback: _jsx(LoadingFallback, {}), children: _jsx(Routes, { children: _jsxs(Route, { element: _jsx(PageLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "research", element: _jsx(ResearchIndex, {}) }), _jsx(Route, { path: "research/:slug", element: _jsx(ResearchDetail, {}) }), _jsx(Route, { path: "people", element: _jsx(People, {}) }), _jsx(Route, { path: "people/:slug", element: _jsx(PersonDetail, {}) }), _jsx(Route, { path: "topics", element: _jsx(Topics, {}) }), _jsx(Route, { path: "topics/:slug", element: _jsx(Topics, {}) }), _jsx(Route, { path: "events", element: _jsx(Events, {}) }), _jsx(Route, { path: "about", element: _jsx(About, {}) }), _jsx(Route, { path: "contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }));
}
