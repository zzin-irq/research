import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import articles from '../../data/research.json';

export default function ResearchDetail() {
  const { slug } = useParams();
  const data = articles.find(a => a.slug === slug);

  if (!data) {
    return (
      <div className="max-w-prose mx-auto px-4 py-16 text-text-muted">
        المقال غير موجود. <Link to="/research" className="text-primary hover:underline">العودة للأبحاث</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data.title} · منتدى سياسات الشرق الأوسط</title>
        <meta name="description" content={data.summary} />
      </Helmet>
      <article className="max-w-prose mx-auto px-4 py-16 md:py-24">
        <p className="text-sm uppercase tracking-wider text-accent mb-4 font-semibold">
          {data.topic_name}
        </p>
        <h1 className="font-serif text-3xl md:text-5xl leading-tight font-bold mb-6 text-accent-dark">{data.title}</h1>
        <p className="text-xl text-text-muted mb-8 leading-relaxed">{data.summary}</p>

        <div className="flex items-center gap-4 py-6 border-y border-border mb-12">
          <p className="text-sm font-semibold">
            <Link to={`/people/${data.author_slug}`} className="hover:underline text-text">
              {data.author_name}
            </Link>
          </p>
          <div className="ms-auto text-sm text-text-faint">
            {new Date(data.published_at).toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <div
          className="text-lg leading-relaxed text-text [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:font-semibold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-accent-soft [&>h3]:text-xl [&>h3]:font-serif [&>h3]:text-accent [&>h3]:mt-8 [&>h3]:mb-3 [&>ul]:list-disc [&>ul]:ms-6 [&>ul]:mb-6 [&>blockquote]:border-s-4 [&>blockquote]:border-primary [&>blockquote]:ps-4 [&>blockquote]:italic [&>blockquote]:my-6"
          dangerouslySetInnerHTML={{ __html: data.body_html }}
        />
      </article>
    </>
  );
}
