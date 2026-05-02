import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export default function People() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const res = await fetch('/api/v1/people');
      if (!res.ok) throw new Error('Failed to fetch people');
      return res.json();
    }
  });

  return (
    <>
      <Helmet><title>الخبراء · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">الخبراء</h1>
        
        {isLoading && <p className="text-text-muted">جاري تحميل الخبراء...</p>}
        {error && <p className="text-red-600">حدث خطأ أثناء تحميل الخبراء.</p>}

        {data && data.items && (
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {data.items.map((person: any) => (
              <div key={person.id} className="flex flex-col">
                <Link to={`/people/${person.slug}`} className="group block mb-4">
                  {person.photo_url ? (
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-surface-muted mb-4">
                      <img 
                        src={person.photo_url} 
                        alt={person.name} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square w-full rounded-lg bg-surface-muted mb-4 flex items-center justify-center text-text-faint">
                      بدون صورة
                    </div>
                  )}
                  <h3 className="font-serif text-xl group-hover:underline text-text">
                    {person.name}
                  </h3>
                </Link>
                <p className="text-sm text-text-muted">{person.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
