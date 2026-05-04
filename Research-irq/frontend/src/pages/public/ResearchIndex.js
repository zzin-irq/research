import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import articles from '../../data/research.json';
function getCategoryColor(topicName) {
    if (topicName.includes('السياسة') || topicName.includes('Policy'))
        return 'bg-primary bg-accent-soft text-primary';
    if (topicName.includes('العلاقات') || topicName.includes('Relations'))
        return 'bg-accent bg-teal-surface text-accent';
    if (topicName.includes('التاريخ') || topicName.includes('History'))
        return 'bg-text-muted bg-surface-muted text-text-muted';
    return 'bg-primary bg-accent-soft text-primary';
}
export default function ResearchIndex() {
    const [params] = useSearchParams();
    const topicFilter = params.get('topic');
    const items = topicFilter
        ? articles.filter(a => a.topic_slug === topicFilter)
        : articles;
    return (_jsxs(_Fragment, { children: [_jsxs(Helmet, { children: [_jsx("title", { children: "\u0627\u0644\u0623\u0628\u062D\u0627\u062B \u00B7 \u0645\u0646\u062A\u062F\u0649 \u0633\u064A\u0627\u0633\u0627\u062A \u0627\u0644\u0634\u0631\u0642 \u0627\u0644\u0623\u0648\u0633\u0637" }), _jsx("meta", { name: "description", content: "\u0623\u0628\u062D\u0627\u062B \u0645\u0646 \u0627\u0644\u0645\u0646\u062A\u062F\u0649 \u062D\u0648\u0644 \u0627\u0644\u0633\u064A\u0627\u0633\u0629 \u0627\u0644\u0639\u0627\u0645\u0629\u060C \u0648\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u062F\u0648\u0644\u064A\u0629\u060C \u0648\u0627\u0644\u062A\u0627\u0631\u064A\u062E." })] }), _jsxs("div", { className: "max-w-content mx-auto px-4 md:px-12 py-16 md:py-24", children: [_jsx("h1", { className: "font-serif text-3xl md:text-5xl font-bold mb-3 text-accent-dark", children: "\u0623\u062D\u062F\u062B \u0627\u0644\u0623\u0628\u062D\u0627\u062B" }), _jsx("div", { className: "h-0.5 bg-accent-soft mb-12 w-full" }), items.length === 0 && (_jsx("p", { className: "text-text-muted text-lg", children: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0628\u062D\u0627\u062B \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0636\u0648\u0639." })), _jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: items.map(article => {
                            const colorClass = getCategoryColor(article.topic_name);
                            const [borderColor, ...badge] = colorClass.split(' ');
                            return (_jsxs("article", { className: "group bg-surface border border-border rounded-xl overflow-hidden hover:border-primary transition-colors duration-200 flex flex-col h-full relative", children: [_jsx("div", { className: `absolute top-0 right-0 w-1 h-full ${borderColor} opacity-60` }), _jsxs("div", { className: "p-6 flex flex-col h-full z-10", children: [_jsx("div", { className: "mb-4", children: _jsx("span", { className: `inline-block px-3 py-1 rounded-full text-xs font-bold ${badge.join(' ')}`, children: article.topic_name }) }), _jsx("h3", { className: "font-serif text-xl font-semibold mb-4 leading-tight text-text group-hover:text-primary transition-colors", children: _jsx(Link, { to: `/research/${article.slug}`, className: "before:absolute before:inset-0", children: article.title }) }), _jsx("p", { className: "text-base text-text-muted mb-8 line-clamp-3 leading-relaxed flex-grow", children: article.summary }), _jsxs("div", { className: "mt-auto border-t border-border pt-6 flex items-center justify-between text-xs font-medium text-text-faint", children: [_jsx("span", { children: article.author_name }), _jsx("span", { children: new Date(article.published_at).toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' }) })] })] })] }, article.id));
                        }) })] })] }));
}
