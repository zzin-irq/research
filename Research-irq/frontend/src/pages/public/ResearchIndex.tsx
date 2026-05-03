import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import articles from '../../data/research.json';

function getCategoryColor(topicName: string) {
  if (topicName.includes('السياسة') || topicName.includes('Policy'))
    return 'border-blue-500 bg-blue-50 text-blue-700';
  if (topicName.includes('العلاقات') || topicName.includes('Relations'))
    return 'border-emerald-500 bg-emerald-50 text-emerald-700';
  if (topicName.includes('التاريخ') || topicName.includes('History'))
    return 'border-purple-500 bg-purple-50 text-purple-700';
  return 'border-primary bg-surface-muted text-primary';
}

export default function ResearchIndex() {
  const [params] = useSearchParams();
  const topicFilter = params.get('topic');
  const items = topicFilter
    ? articles.filter(a => a.topic_slug === topicFilter)
    : articles;

  return (
    <>
      <Helmet>
        <title>الأبحاث · منتدى سياسات الشرق الأوسط</title>
        <meta name="description" content="أبحاث من المنتدى حول السياسة العامة، والعلاقات الدولية، والتاريخ." />
      </Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-12">أحدث الأبحاث</h1>

        {items.length === 0 && (
          <p className="text-text-muted text-lg">لا توجد أبحاث في هذا الموضوع.</p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map(article => {
            const colorClass = getCategoryColor(article.topic_name);
            const [borderColor, ...badge] = colorClass.split(' ');
            return (
              <article
                key={article.id}
                className="group bg-surface border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative"
              >
                <div className={`absolute top-0 right-0 w-1 h-full ${borderColor} opacity-50`} />
                <div className="p-6 md:p-8 flex flex-col h-full z-10">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badge.join(' ')}`}>
                      {article.topic_name}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/research/${article.slug}`} className="before:absolute before:inset-0">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-base text-text-muted mb-8 line-clamp-3 leading-relaxed flex-grow">
                    {article.summary}
                  </p>
                  <div className="mt-auto border-t border-border pt-6 flex items-center justify-between text-xs font-medium text-text-faint">
                    <span>{article.author_name}</span>
                    <span>{new Date(article.published_at).toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
