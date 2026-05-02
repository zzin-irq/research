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

      {/* Hero Section: Gradient from Indigo to Cyan */}
      <section className="bg-gradient-to-br from-[#312E81] via-[#1E3A8A] to-[#06B6D4] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-content mx-auto px-4 md:px-12 py-24 md:py-36 text-center relative z-10">
          <h1 className="font-serif text-[2.5rem] md:text-[4.5rem] leading-tight font-bold mb-6 drop-shadow-lg">
            منتدى سياسات
            <br />
            الشرق الأوسط
          </h1>
          <hr className="my-8 mx-auto w-24 border-0 h-1 bg-warning rounded-full shadow-lg" />
          <p className="text-xl md:text-2xl text-indigo-100 max-w-prose mx-auto mb-10 leading-relaxed font-light">
            أبحاث مستقلة حول القضايا التي ترسم معالم الحياة العامة، برؤية محلية للمنطقة العربية وعمق دولي.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 justify-center">
            <Link
              to="/research"
              className="h-14 px-8 inline-flex items-center rounded-full bg-warning text-white font-bold text-lg hover:bg-yellow-600 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              تصفح أحدث الأبحاث
            </Link>
            <Link
              to="/about"
              className="h-14 px-8 inline-flex items-center rounded-full border-2 border-white/80 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              عن المنتدى
            </Link>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="max-w-wide mx-auto px-4 md:px-12 py-24">
        
        {/* Filter / Sort Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold">الأبحاث المختارة</h2>
          
          <div className="flex bg-surface-muted p-1 rounded-full border border-border">
            <button className="px-6 py-2 rounded-full bg-surface shadow-sm text-sm font-bold text-primary border border-border">الأحدث</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-text-muted hover:text-text transition-colors">الأكثر قراءة</button>
            <button className="px-6 py-2 rounded-full text-sm font-medium text-text-muted hover:text-text transition-colors">الموضوعات</button>
          </div>
        </div>

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
