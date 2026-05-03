import { Helmet } from 'react-helmet-async';

export default function Contact() {
  return (
    <>
      <Helmet><title>اتصل بنا · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-10">تواصل معنا</h1>
        <div className="space-y-6 text-text">
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted mb-1">الاستفسارات الصحفية</h3>
            <a href="mailto:zzinchicago@gmail.com" className="hover:underline">zzinchicago@gmail.com</a>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted mb-1">معلومات عامة</h3>
            <a href="mailto:zzinchicago@gmail.com" className="hover:underline">zzinchicago@gmail.com</a>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted mb-1">المكتب</h3>
            <p>Najef, Iraq</p>
          </div>
        </div>
      </div>
    </>
  );
}
