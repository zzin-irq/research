import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

export default function Events() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch('/api/v1/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      return res.json();
    }
  });

  return (
    <>
      <Helmet><title>الفعاليات · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">الفعاليات</h1>
        
        {isLoading && <p className="text-text-muted">جاري تحميل الفعاليات...</p>}
        {error && <p className="text-red-600">حدث خطأ أثناء تحميل الفعاليات.</p>}

        {data && data.items && (
          <div className="flex flex-col gap-8">
            {data.items.map((event: any) => {
              const startDate = new Date(event.starts_at);
              const endDate = event.ends_at ? new Date(event.ends_at) : null;
              
              return (
                <div key={event.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-border bg-surface hover:border-border-strong transition-colors">
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="text-accent font-bold text-lg mb-1">
                      {startDate.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-sm text-text-muted mb-2">
                      {startDate.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })}
                      {endDate && ` - ${endDate.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })}`}
                    </div>
                  </div>
                  
                  <div className="md:w-3/4">
                    <h3 className="font-serif text-2xl mb-3 text-text">
                      {event.title}
                    </h3>
                    <p className="text-base text-text-muted mb-4">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {event.location && (
                        <div className="flex items-center text-text-faint bg-surface-muted px-3 py-1 rounded-full">
                          📍 {event.location}
                        </div>
                      )}
                      
                      {event.rsvp_url && (
                        <a 
                          href={event.rsvp_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ms-auto inline-flex items-center justify-center h-8 px-4 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary-hover"
                        >
                          تسجيل الحضور
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
