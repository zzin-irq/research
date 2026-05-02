import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

function getCategoryColor(topicName: string) {
  if (!topicName) return 'border-border bg-surface-muted text-text-muted';
  if (topicName.includes('السياسة') || topicName.includes('Policy')) return 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
  if (topicName.includes('العلاقات') || topicName.includes('Relations')) return 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
  if (topicName.includes('التاريخ') || topicName.includes('History')) return 'border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
  return 'border-primary bg-surface-muted text-primary';
}

export default function ResearchIndex() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['research'],
    queryFn: async () => {
      const res = await fetch('/api/v1/research');
      if (!res.ok) throw new Error('Failed to fetch research');
      return res.json();
    }
  });

  return (
    <>
      <Helmet>
        <title>الأبحاث · منتدى سياسات الشرق الأوسط</title>
        <meta name="description" content="أبحاث من المنتدى حول السياسة العامة، والعلاقات الدولية، والتاريخ." />
      </Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-12">أحدث الأبحاث</h1>
        
        {isLoading && <p className="text-text-muted text-lg">جاري تحميل الأبحاث...</p>}
        {error && <p className="text-red-600">حدث خطأ أثناء تحميل الأبحاث. يرجى المحاولة مرة أخرى لاحقاً.</p>}
        
        {data && data.items && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((article: any, i: number) => {
              const colorClass = getCategoryColor(article.topic_name);
              const borderColor = colorClass.split(' ')[0];
              const badgeClass = colorClass.replace(borderColor, '').trim();

              return (
                <article
                  key={article.id}
                  className="group bg-surface border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative"
                >
                  <div className={`absolute top-0 right-0 w-1 h-full ${borderColor} opacity-50`}></div>
                  
                  <div className="p-6 md:p-8 flex flex-col h-full z-10">
                    {article.topic_name && (
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${badgeClass}`}>
                          {article.topic_name}
                        </span>
                      </div>
                    )}
                    
                    <h3 className="font-serif text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                      <Link to={`/research/${article.slug}`} className="before:absolute before:inset-0">
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-base text-text-muted mb-8 line-clamp-3 leading-relaxed flex-grow">
                      {article.summary}
                    </p>
                    
                    <div className="mt-auto border-t border-border pt-6">
                      <div className="flex items-center justify-between mb-4 text-xs font-medium text-text-faint">
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-surface-muted border border-border overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt={article.author_name} className="w-full h-full object-cover" />
                          </div>
                          {article.author_name}
                        </span>
                        <span>{new Date(article.published_at).toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' })}</span>
                      </div>
                      
                      <button className="w-full py-3 rounded-xl bg-surface-muted text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                        قراءة البحث
                        <span className="text-lg leading-none transform group-hover:-translate-x-1 transition-transform">←</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
