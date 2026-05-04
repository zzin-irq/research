import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>منتدى سياسات الشرق الأوسط</title>
        <meta
          name="description"
          content="منصة فكرية مستقلة تُعنى بتحليل التفاعلات الإستراتيجية وصياغة الرؤى السياسية المعمّقة، بهدف تعزيز الاستقرار المؤسسي وبناء جسور المعرفة بين الفكر الأكاديمي وصناعة القرار، مع التركيز على السياسات الدولية، ولا سيما ما يتعلق بمنطقة الشرق الأوسط."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-bg flex flex-col items-center py-16 md:py-24 px-4">
        <div className="text-center max-w-2xl w-full">
          <h1 className="font-serif text-3xl md:text-[4rem] leading-tight font-bold mb-4 md:mb-6 text-accent-dark">
            منتدى سياسات
            <br />
            الشرق الأوسط
          </h1>
          <hr className="my-4 md:my-6 mx-auto w-16 md:w-24 border-0 h-1 bg-primary rounded-full" />
          <p className="text-base md:text-xl text-text mb-8 md:mb-10 leading-relaxed px-2">
            منصة فكرية مستقلة تُعنى بتحليل التفاعلات الإستراتيجية وصياغة الرؤى السياسية المعمّقة، بهدف تعزيز الاستقرار المؤسسي وبناء جسور المعرفة بين الفكر الأكاديمي وصناعة القرار، مع التركيز على السياسات الدولية، ولا سيما ما يتعلق بمنطقة الشرق الأوسط
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Link
              to="/research"
              className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 inline-flex items-center justify-center rounded bg-primary text-white font-bold text-base md:text-lg hover:bg-primary-hover transition-colors"
            >
              تصفح أحدث الأبحاث
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 inline-flex items-center justify-center rounded border-2 border-primary text-primary font-bold text-base md:text-lg hover:bg-accent-soft transition-colors"
            >
              عن المنتدى
            </Link>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="max-w-wide mx-auto px-4 md:px-12 py-16 md:py-24">

        <h2 className="font-serif text-2xl md:text-4xl font-semibold mb-2 text-text">الأبحاث المختارة</h2>
        <div className="h-0.5 bg-accent-soft mb-8 md:mb-12 w-full" />

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {[1, 2, 3].map(i => {
            const categories = [
              { bar: 'bg-primary', badge: 'bg-accent-soft text-primary', label: 'العلاقات الدولية' },
              { bar: 'bg-accent', badge: 'bg-teal-surface text-accent', label: 'السياسة العامة' },
              { bar: 'bg-text-muted', badge: 'bg-surface-muted text-text-muted', label: 'التاريخ' },
            ];
            const cat = categories[(i - 1) % 3];

            return (
              <article
                key={i}
                className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-primary transition-colors duration-200 flex flex-col relative"
              >
                <div className={`absolute top-0 right-0 w-1 h-full ${cat.bar} opacity-60`}></div>

                <div className="p-6 flex flex-col h-full z-10">
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${cat.badge}`}>
                      {cat.label}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-semibold mb-3 leading-tight text-text group-hover:text-primary transition-colors">
                    <Link to="/research/example" className="before:absolute before:inset-0">
                      مستقبل التجارة في الشرق الأوسط: تحديات البنية التحتية
                    </Link>
                  </h3>

                  <p className="text-base text-text-muted mb-6 line-clamp-3 leading-relaxed flex-grow">
                    ملخص قصير يوضح الفكرة الرئيسية للبحث ولماذا هي مهمة في الوقت الحالي. تتناول هذه الورقة تأثيرات التطورات الأخيرة على سياسات النقل البحري والبري في المنطقة وكيفية التكيف معها.
                  </p>

                  <div className="mt-auto border-t border-border pt-4">
                    <div className="flex items-center justify-between mb-3 text-xs font-medium text-text-faint flex-wrap gap-y-1">
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-surface-muted border border-border overflow-hidden flex-shrink-0">
                          <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Author" className="w-full h-full object-cover" />
                        </div>
                        د. محمد أحمد
                      </span>
                      <span className="text-text-faint">١٢ مايو ٢٠٢٦</span>
                    </div>

                    <button className="w-full py-2.5 rounded border border-primary text-primary font-bold text-sm group-hover:bg-accent-soft transition-colors flex items-center justify-center gap-2">
                      قراءة البحث
                      <span className="text-base leading-none">←</span>
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
