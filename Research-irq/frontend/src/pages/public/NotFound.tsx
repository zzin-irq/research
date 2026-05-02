import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>الصفحة غير موجودة · منتدى سياسات الشرق الأوسط</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="max-w-prose mx-auto px-4 py-24 text-center">
        <p className="text-sm uppercase tracking-wider text-accent">٤٠٤</p>
        <h1 className="font-serif text-3xl md:text-4xl mt-2">الصفحة غير موجودة</h1>
        <p className="mt-4 text-text-muted">الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <Link to="/" className="mt-6 inline-flex h-11 px-5 items-center rounded-md bg-primary text-white">
          العودة للرئيسية
        </Link>
      </div>
    </>
  );
}
