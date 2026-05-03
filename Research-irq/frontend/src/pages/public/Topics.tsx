import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import topics from '../../data/topics.json';

export default function Topics() {
  return (
    <>
      <Helmet><title>المواضيع · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">المواضيع</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map(topic => (
            <Link
              key={topic.id}
              to={`/research?topic=${topic.slug}`}
              className="group block p-8 rounded-lg border border-border bg-surface hover:border-primary transition-colors"
            >
              <h3 className="font-serif text-2xl group-hover:text-primary mb-3 text-text">{topic.name}</h3>
              <p className="text-text-muted">{topic.description}</p>
              <div className="mt-6 flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                عرض الأبحاث ←
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
