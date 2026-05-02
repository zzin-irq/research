import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function PersonDetail() {
  const { slug } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['people', slug],
    queryFn: async () => {
      const res = await fetch(`/api/v1/people/${slug}`);
      if (!res.ok) throw new Error('Failed to fetch person');
      return res.json();
    }
  });

  if (isLoading) {
    return <div className="max-w-prose mx-auto px-4 py-16 text-text-muted">جاري تحميل الملف الشخصي...</div>;
  }

  if (error || !data) {
    return <div className="max-w-prose mx-auto px-4 py-16 text-red-600">حدث خطأ أثناء تحميل الملف الشخصي.</div>;
  }

  return (
    <>
      <Helmet>
        <title>{data.name} · منتدى سياسات الشرق الأوسط</title>
      </Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {data.photo_url && (
            <div className="md:w-1/3 flex-shrink-0">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-surface-muted">
                <img 
                  src={data.photo_url} 
                  alt={data.name} 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="md:w-2/3">
            <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-2">
              {data.name}
            </h1>
            <p className="text-xl text-text-muted mb-8 pb-8 border-b border-border">
              {data.role}
            </p>
            
            <div 
              className="text-lg leading-relaxed text-text [&>p]:mb-6"
              dangerouslySetInnerHTML={{ __html: data.bio_html }} 
            />

            {data.links && data.links.length > 0 && (
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-4">الروابط والملفات الشخصية</h3>
                <ul className="flex flex-col gap-2">
                  {data.links.map((link: any, i: number) => (
                    <li key={i}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
