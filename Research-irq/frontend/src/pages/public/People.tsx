import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import people from '../../data/people.json';

export default function People() {
  return (
    <>
      <Helmet><title>الخبراء · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-accent-dark">الخبراء</h1>
        <div className="h-0.5 bg-accent-soft mb-8 w-full" />
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {people.map(person => (
            <div key={person.id} className="flex flex-col">
              <Link to={`/people/${person.slug}`} className="group block mb-4">
                {person.photo_url ? (
                  <div className="aspect-square w-full overflow-hidden rounded-xl bg-surface-muted mb-4">
                    <img
                      src={person.photo_url}
                      alt={person.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full rounded-xl bg-surface-muted mb-4 flex items-center justify-center text-text-faint">
                    بدون صورة
                  </div>
                )}
                <h3 className="font-serif text-xl group-hover:underline text-text">{person.name}</h3>
              </Link>
              <p className="text-sm text-text-muted">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
