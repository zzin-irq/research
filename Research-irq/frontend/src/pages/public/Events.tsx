import { Helmet } from 'react-helmet-async';
import events from '../../data/events.json';

export default function Events() {
  return (
    <>
      <Helmet><title>الفعاليات · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-accent-dark">الفعاليات</h1>
        <div className="h-0.5 bg-accent-soft mb-8 w-full" />
        {events.length === 0 && <p className="text-text-muted">لا توجد فعاليات قادمة.</p>}
        <div className="flex flex-col gap-8">
          {events.map(event => {
            const startDate = new Date(event.starts_at);
            const endDate = event.ends_at ? new Date(event.ends_at) : null;
            return (
              <div key={event.id} className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border bg-surface hover:border-primary transition-colors">
                <div className="md:w-1/4 flex-shrink-0">
                  <div className="text-accent font-bold text-lg mb-1">
                    {startDate.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-sm text-text-muted">
                    {startDate.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })}
                    {endDate && ` - ${endDate.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit' })}`}
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="font-serif text-2xl mb-3 text-text">{event.title}</h3>
                  <p className="text-base text-text-muted mb-4">{event.description}</p>
                  {event.location && (
                    <div className="inline-flex items-center text-text-faint bg-surface-muted px-3 py-1 rounded-full text-sm">
                      📍 {event.location}
                    </div>
                  )}
                  {event.rsvp_url && (
                    <a href={event.rsvp_url} target="_blank" rel="noopener noreferrer"
                      className="ms-4 inline-flex items-center h-11 px-5 text-sm font-medium rounded bg-primary text-white hover:bg-primary-hover transition-colors">
                      تسجيل الحضور
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
