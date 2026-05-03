import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>منتدى سياسات الشرق الأوسط</title>
        <meta
          name="description"
          content="أبحاث مستقلة حول السياسة العامة، العلاقات الدولية، التاريخ، والقضايا التي ترسم معالم الحياة العامة."
        />
      </Helmet>

      {/* Hero Section: image top, text bottom */}
      <section className="overflow-hidden text-white bg-[#CE8259] flex flex-col items-center py-8 md:py-16 px-4">

        {/* Top: Mosque image — centered, constrained width */}
        <div className="w-full max-w-sm md:max-w-lg rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={`${import.meta.env.BASE_URL}mosque-hero.jpg`}
            alt="مسجد في المنطقة العربية"
            className="w-full h-48 md:h-80 object-cover object-center"
          />
        </div>

        {/* Bottom: Text content */}
        <div className="mt-6 md:mt-10 text-center max-w-2xl w-full">
          <h1 className="font-serif text-3xl md:text-[4rem] leading-tight font-bold mb-4 md:mb-6 drop-shadow-lg text-white">
            منتدى سياسات
            <br />
            الشرق الأوسط
          </h1>
          <hr className="my-4 md:my-6 mx-auto w-16 md:w-24 border-0 h-1 bg-[#E5AA5D] rounded-full shadow-lg" />
          <p className="text-base md:text-2xl text-black mb-8 md:mb-10 leading-relaxed font-light drop-shadow-md px-2">
            أبحاث مستقلة حول القضايا التي ترسم معالم الحياة العامة، برؤية محلية للمنطقة العربية وعمق دولي.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link
              to="/research"
              className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 inline-flex items-center justify-center rounded-full bg-[#CA8737] text-white font-bold text-base md:text-lg hover:bg-[#E5AA5D] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              تصفح أحدث الأبحاث
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 inline-flex items-center justify-center rounded-full border-2 border-[#FDE3B4]/80 text-[#FDE3B4] font-bold text-base md:text-lg hover:bg-[#FDE3B4]/10 transition-all backdrop-blur-sm"
            >
              عن المنتدى
            </Link>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="max-w-wide mx-auto px-4 md:px-12 py-12 md:py-24">

        <h2 className="font-serif text-2xl md:text-4xl font-bold mb-8 md:mb-12">الأبحاث المختارة</h2>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {[1, 2, 3].map(i => {
            const categoryColors = ['border-blue-500 bg-blue-50 text-blue-700', 'border-emerald-500 bg-emerald-50 text-emerald-700', 'border-purple-500 bg-purple-50 text-purple-700'];
            const colorClass = categoryColors[i % 3];

            return (
              <article
                key={i}
                className="group bg-surface border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col relative"
              >
                <div className={`absolute top-0 right-0 w-1 h-full ${colorClass.split(' ')[0]} opacity-50`}></div>

                <div className="p-5 md:p-8 flex flex-col h-full z-10">
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colorClass.replace('border-', '')}`}>
                      {i === 1 ? 'العلاقات الدولية' : i === 2 ? 'السياسة العامة' : 'التاريخ'}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                    <Link to="/research/example" className="before:absolute before:inset-0">
                      مستقبل التجارة في الشرق الأوسط: تحديات البنية التحتية
                    </Link>
                  </h3>

                  <p className="text-sm md:text-base text-text-muted mb-6 line-clamp-3 leading-relaxed flex-grow">
                    ملخص قصير يوضح الفكرة الرئيسية للبحث ولماذا هي مهمة في الوقت الحالي. تتناول هذه الورقة تأثيرات التطورات الأخيرة على سياسات النقل البحري والبري في المنطقة وكيفية التكيف معها.
                  </p>

                  <div className="mt-auto border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3 text-xs font-medium text-text-faint flex-wrap gap-y-1">
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-surface-muted border border-border overflow-hidden flex-shrink-0">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Author" className="w-full h-full object-cover" />
                        </div>
                        د. محمد أحمد
                      </span>
                      <span className="text-text-faint">١٢ مايو ٢٠٢٦</span>
                    </div>

                    <button className="w-full py-2.5 rounded-xl bg-surface-muted text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      قراءة البحث
                      <span className="text-base leading-none transform group-hover:-translate-x-1 transition-transform">←</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 md:mt-16 text-center">
          <Link to="/research" className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-base md:text-lg">
            تصفح أرشيف الأبحاث الكامل
            <span>←</span>
          </Link>
        </div>
      </section>
    </>
  );
}
