import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
const NAV = [
    { to: '/', label: 'الرئيسية' },
    { to: '/research', label: 'الأبحاث' },
    { to: '/events', label: 'الفعاليات' },
    { to: '/about', label: 'من نحن' },
    { to: '/contact', label: 'اتصل بنا' }
];
export function PageLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-bg text-text", children: [_jsx("a", { href: "#main", className: "skip-link", children: "\u062A\u062E\u0637\u064A \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649" }), _jsxs("header", { className: "sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border", children: [_jsxs("div", { className: "max-w-wide mx-auto flex items-center justify-between px-4 md:px-12 h-14 md:h-16", children: [_jsx(Link, { to: "/", className: "font-serif font-bold text-base md:text-lg text-primary leading-tight shrink-0", "aria-label": "\u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u2014 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", children: "\u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637" }), _jsx("nav", { "aria-label": "\u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629", className: "hidden md:flex gap-1 items-center", children: NAV.map(item => (_jsx(NavLink, { to: item.to, end: item.to === '/', className: ({ isActive }) => `text-sm font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap ${isActive
                                        ? 'bg-accent-soft text-primary border border-primary/20'
                                        : 'text-text-muted hover:text-primary hover:bg-accent-soft'}`, children: item.label }, item.to))) }), _jsxs("button", { className: "md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-muted transition-colors", onClick: () => setMenuOpen(o => !o), "aria-label": "\u0627\u0644\u0642\u0627\u0626\u0645\u0629", "aria-expanded": menuOpen, children: [_jsx("span", { className: `block w-5 h-0.5 bg-text-muted transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}` }), _jsx("span", { className: `block w-5 h-0.5 bg-text-muted transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}` }), _jsx("span", { className: `block w-5 h-0.5 bg-text-muted transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}` })] })] }), menuOpen && (_jsx("nav", { className: "md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-1", children: NAV.map(item => (_jsx(NavLink, { to: item.to, end: item.to === '/', onClick: () => setMenuOpen(false), className: ({ isActive }) => `text-sm font-semibold px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-accent-soft text-primary border border-primary/20'
                                : 'text-text-muted hover:text-primary hover:bg-accent-soft'}`, children: item.label }, item.to))) }))] }), _jsx("main", { id: "main", className: "flex-1", children: _jsx(Outlet, {}) }), _jsxs("footer", { className: "bg-accent-dark text-white mt-12 md:mt-24", children: [_jsxs("div", { className: "max-w-wide mx-auto px-4 md:px-12 py-10 md:py-16 grid gap-8 md:grid-cols-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-serif font-bold text-lg text-white mb-4", children: "\u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637" }), _jsx("p", { className: "text-sm text-white/70 leading-relaxed max-w-xs", children: "\u0623\u0628\u062D\u0627\u062B \u0645\u0633\u062A\u0642\u0644\u0629 \u062D\u0648\u0644 \u0627\u0644\u0642\u0636\u0627\u064A\u0627 \u0627\u0644\u062A\u064A \u062A\u0631\u0633\u0645 \u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0639\u0627\u0645\u0629\u060C \u0645\u0646 \u0627\u0644\u0633\u064A\u0627\u0633\u0629 \u0648\u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F \u0625\u0644\u0649 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u062F\u0648\u0644\u064A\u0629." })] }), _jsx(FooterCol, { title: "\u0627\u0644\u0623\u0628\u062D\u0627\u062B", links: [
                                    ['أحدث الإصدارات', '/research'],
                                    ['الموضوعات', '/topics'],
                                ] }), _jsx(FooterCol, { title: "\u0627\u0644\u0645\u0646\u062A\u062F\u0649", links: [
                                    ['من نحن', '/about'],
                                    ['الخبراء', '/people'],
                                    ['الفعاليات', '/events']
                                ] }), _jsx(FooterCol, { title: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627", links: [
                                    ['اتصل بنا', '/contact'],
                                ] })] }), _jsx("div", { className: "border-t border-white/10", children: _jsxs("p", { className: "max-w-wide mx-auto px-4 md:px-12 py-4 text-sm text-white/50", children: ["\u00A9 ", new Date().getFullYear(), " \u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629."] }) })] })] }));
}
function FooterCol({ title, links }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-bold text-white mb-4", children: title }), _jsx("ul", { className: "space-y-3", children: links.map(([label, to]) => (_jsx("li", { children: _jsx(Link, { to: to, className: "text-sm text-white/70 hover:text-white transition-colors", children: label }) }, to))) })] }));
}
