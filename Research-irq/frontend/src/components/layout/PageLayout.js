import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, Link, NavLink } from 'react-router-dom';
const NAV = [
    { to: '/', label: 'الرئيسية', color: 'primary' },
    { to: '/research', label: 'الأبحاث', color: 'blue' },
    { to: '/events', label: 'الفعاليات', color: 'orange' },
    { to: '/about', label: 'من نحن', color: 'pink' },
    { to: '/contact', label: 'اتصل بنا', color: 'teal' }
];
function getTabClasses(color, isActive) {
    const base = "text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap";
    if (!isActive) {
        return `${base} text-text-muted hover:bg-surface-muted hover:text-text`;
    }
    // Pill look when active:
    const activeBase = `${base} bg-surface-muted shadow-sm border border-border`;
    switch (color) {
        case 'primary': return `${activeBase} text-primary dark:text-indigo-400`;
        case 'blue': return `${activeBase} text-blue-600 dark:text-blue-400`;
        case 'emerald': return `${activeBase} text-emerald-600 dark:text-emerald-400`;
        case 'purple': return `${activeBase} text-purple-600 dark:text-purple-400`;
        case 'orange': return `${activeBase} text-orange-600 dark:text-orange-400`;
        case 'pink': return `${activeBase} text-pink-600 dark:text-pink-400`;
        case 'teal': return `${activeBase} text-teal-600 dark:text-teal-400`;
        default: return `${activeBase} text-primary`;
    }
}
export function PageLayout() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-bg text-text", children: [_jsx("a", { href: "#main", className: "skip-link", children: "\u062A\u062E\u0637\u064A \u0625\u0644\u0649 \u0627\u0644\u0645\u062D\u062A\u0648\u0649" }), _jsx("header", { className: "sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border py-3", children: _jsxs("div", { className: "max-w-wide mx-auto flex items-center justify-between px-4 md:px-12 gap-6", children: [_jsx(Link, { to: "/", className: "flex items-center", "aria-label": "\u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637 \u2014 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629", children: _jsx("img", { src: "/logo.jpg", alt: "\u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637", width: "56", height: "56", className: "h-12 md:h-14 w-auto object-contain" }) }), _jsx("nav", { "aria-label": "\u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629", className: "flex-1 hidden md:flex justify-center gap-2 items-center", children: NAV.map(item => (_jsx(NavLink, { to: item.to, className: ({ isActive }) => getTabClasses(item.color, isActive), children: item.label }, item.to))) }), _jsx("div", {})] }) }), _jsx("main", { id: "main", className: "flex-1", children: _jsx(Outlet, {}) }), _jsxs("footer", { className: "bg-primary text-white mt-24", children: [_jsxs("div", { className: "max-w-wide mx-auto px-4 md:px-12 py-16 grid gap-12 md:grid-cols-4", children: [_jsxs("div", { children: [_jsx("div", { className: "mb-6", children: _jsx("img", { src: "/logo.jpg", alt: "\u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637", width: "160", height: "160", className: "w-32 h-auto rounded-lg bg-white p-2" }) }), _jsx("p", { className: "text-sm text-indigo-200 leading-relaxed max-w-xs", children: "\u0623\u0628\u062D\u0627\u062B \u0645\u0633\u062A\u0642\u0644\u0629 \u062D\u0648\u0644 \u0627\u0644\u0642\u0636\u0627\u064A\u0627 \u0627\u0644\u062A\u064A \u062A\u0631\u0633\u0645 \u0645\u0639\u0627\u0644\u0645 \u0627\u0644\u062D\u064A\u0627\u0629 \u0627\u0644\u0639\u0627\u0645\u0629\u060C \u0645\u0646 \u0627\u0644\u0633\u064A\u0627\u0633\u0629 \u0648\u0627\u0644\u0627\u0642\u062A\u0635\u0627\u062F \u0625\u0644\u0649 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u062F\u0648\u0644\u064A\u0629." })] }), _jsx(FooterCol, { title: "\u0627\u0644\u0623\u0628\u062D\u0627\u062B", links: [
                                    ['أحدث الإصدارات', '/research'],
                                    ['الموضوعات', '/topics'],
                                    ['الدراسات', '/research?type=publication']
                                ] }), _jsx(FooterCol, { title: "\u0627\u0644\u0645\u0646\u062A\u062F\u0649", links: [
                                    ['من نحن', '/about'],
                                    ['الخبراء', '/people'],
                                    ['الفعاليات', '/events']
                                ] }), _jsx(FooterCol, { title: "\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627", links: [
                                    ['اتصل بنا', '/contact'],
                                    ['الصحافة', '/about#press'],
                                    ['النشرة البريدية', '/contact#newsletter']
                                ] })] }), _jsx("div", { className: "border-t border-white/10", children: _jsxs("p", { className: "max-w-wide mx-auto px-4 md:px-12 py-6 text-sm text-indigo-300", children: ["\u00A9 ", new Date().getFullYear(), " \u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637. \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0642 \u0645\u062D\u0641\u0648\u0638\u0629."] }) })] })] }));
}
function FooterCol({ title, links }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-base font-bold text-white mb-6", children: title }), _jsx("ul", { className: "space-y-4", children: links.map(([label, to]) => (_jsx("li", { children: _jsx(Link, { to: to, className: "text-sm text-indigo-200 hover:text-white transition-colors", children: label }) }, to))) })] }));
}
