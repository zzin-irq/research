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

      {/* Hero Section: Split layout — image left, text right */}
      <section className="overflow-hidden text-white bg-[#CE8259] flex flex-col md:flex-row min-h-[560px]">

        {/* Left: Mosque image */}
        <div className="w-full md:w-1/2 relative min-h-[320px] md:min-h-0">
          <img
            src="/mosque-hero.jpg"
            alt="مسجد في المنطقة العربية"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle right-edge fade into the warm background */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#CE8259]/70 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Right: Text content */}
        <div className="w-full md:w-1/2 flex items-center relative z-10">
          <div className="px-8 md:px-16 py-16 md:py-24 text-right w-full">
            <h1 className="font-serif text-[2.5rem] md:text-[4rem] leading-tight font-bold mb-6 drop-shadow-lg text-white">
              منتدى سياسات
              <br />
              الشرق الأوسط
            </h1>
            <hr className="my-8 mr-0 ml-auto w-24 border-0 h-1 bg-[#E5AA5D] rounded-full shadow-lg" />
            <p className="text-xl md:text-2xl text-black mb-10 leading-relaxed font-light drop-shadow-md">
              أبحاث مستقلة حول القضايا التي ترسم معالم الحياة العامة، برؤية محلية للمنطقة العربية وعمق دولي.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 justify-end">
              <Link
                to="/research"
                className="h-14 px-8 inline-flex items-center rounded-full bg-[#CA8737] text-white font-bold text-lg hover:bg-[#E5AA5D] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                تصفح أحدث الأبحاث
              </Link>
              <Link
                to="/about"
                className="h-14 px-8 inline-flex items-center rounded-full border-2 border-[#FDE3B4]/80 text-[#FDE3B4] font-bold text-lg hover:bg-[#FDE3B4]/10 transition-all backdrop-blur-sm"
              >
                عن المنتدى
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="max-w-wide mx-auto px-4 md:px-12 py-24">
        
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">الأبحاث المختارة</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map(i => {
            const categoryColors = ['border-blue-500 bg-blue-50 text-blue-700', 'border-emerald-500 bg-emerald-50 text-emerald-700', 'border-purple-500 bg-purple-50 text-purple-700'];
            const colorClass = categoryColors[i % 3];
            
            return (
              <article
                key={i}
                className="group bg-surface border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full relative"
              >
                {/* Optional side border for category coloring */}
                <div className={`absolute top-0 right-0 w-1 h-full ${colorClass.split(' ')[0]} opacity-50`}></div>
                
                <div className="p-6 md:p-8 flex flex-col h-full z-10">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colorClass.replace('border-', '')}`}>
                      {i === 1 ? 'العلاقات الدولية' : i === 2 ? 'السياسة العامة' : 'التاريخ'}
                    </span>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                    <Link to="/research/example" className="before:absolute before:inset-0">
                      مستقبل التجارة في الشرق الأوسط: تحديات البنية التحتية
                    </Link>
                  </h3>
                  
                  <p className="text-base text-text-muted mb-8 line-clamp-3 leading-relaxed flex-grow">
                    ملخص قصير يوضح الفكرة الرئيسية للبحث ولماذا هي مهمة في الوقت الحالي. تتناول هذه الورقة تأثيرات التطورات الأخيرة على سياسات النقل البحري والبري في المنطقة وكيفية التكيف معها.
                  </p>
                  
                  <div className="mt-auto border-t border-border pt-6">
                    <div className="flex items-center justify-between mb-4 text-xs font-medium text-text-faint">
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-surface-muted border border-border overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Author" className="w-full h-full object-cover" />
                        </div>
                        د. محمد أحمد
                      </span>
                      <span>١٢ مايو ٢٠٢٦ · قراءة ١٢ دقيقة</span>
                    </div>
                    
                    <button className="w-full py-3 rounded-xl bg-surface-muted text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      قراءة البحث
                      <span className="text-lg leading-none transform group-hover:-translate-x-1 transition-transform">←</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link to="/research" className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-lg">
            تصفح أرشيف الأبحاث الكامل
            <span>←</span>
          </Link>
        </div>
      </section>
    </>
  );
}
