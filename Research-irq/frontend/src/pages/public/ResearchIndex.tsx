import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import articles from '../../data/research.json';

function getCategoryColor(topicName: string) {
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

  return (
    <>
      <Helmet>
        <title>الأبحاث · منتدى سياسات الشرق الأوسط</title>
        <meta name="description" content="أبحاث من المنتدى حول السياسة العامة، والعلاقات الدولية، والتاريخ." />
      </Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3 text-accent-dark">أحدث الأبحاث</h1>
        <div className="h-0.5 bg-accent-soft mb-12 w-full" />

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
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-primary transition-colors duration-200 flex flex-col h-full relative"
              >
                <div className={`absolute top-0 right-0 w-1 h-full ${borderColor} opacity-60`} />
                <div className="p-6 flex flex-col h-full z-10">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badge.join(' ')}`}>
                      {article.topic_name}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-4 leading-tight text-text group-hover:text-primary transition-colors">
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
