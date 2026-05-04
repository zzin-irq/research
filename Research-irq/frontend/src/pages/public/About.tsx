import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet><title>من نحن · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-prose mx-auto px-4 py-16 md:py-24">
        <h1 className="font-serif text-3xl md:text-5xl leading-tight font-bold mb-8 text-accent-dark">
          عن المنتدى
        </h1>
        
        <div className="text-lg leading-relaxed text-text space-y-8">
          <section>
            <h2 className="font-serif text-2xl font-semibold mb-4 pb-2 border-b border-accent-soft">مهمتنا</h2>
            <p>
              منتدى سياسات الشرق الأوسط هو مؤسسة بحثية مستقلة وغير حزبية مكرسة للتحليل الدقيق للقضايا التي ترسم معالم الحياة العامة. نحن نؤمن بأن السياسة العامة القوية والعلاقات الدولية الفعالة يجب أن تستند إلى فهم عميق للسياق التاريخي.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold mb-4 pb-2 border-b border-accent-soft">تاريخنا</h2>
            <p className="mb-4">
              تأسس المنتدى استجابة للتعقيد المتزايد للتحديات العالمية، وتطور من تجمع صغير للمؤرخين وممارسي السياسات إلى مؤسسة فكرية رائدة. على مدى العقد الماضي، ساهم خبراؤنا في مناقشات محورية حول الحنكة الاقتصادية، والتخطيط الحضري، والحوكمة متعددة الجنسيات.
            </p>
            <p>
              يسد عملنا الفجوة بين الأكاديمية والساحة السياسية، مما يضمن وصول صناع القرار إلى رؤى مستقلة وقائمة على الأدلة.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold mb-4 pb-2 border-b border-accent-soft">الحوكمة</h2>
            <p>
              يُدار منتدى سياسات الشرق الأوسط بواسطة مجلس أمناء مستقل يتألف من قادة بارزين من الأوساط الأكاديمية، والخدمة العامة، والقطاع الخاص. نحن نحافظ على استقلالية فكرية صارمة ولا نتخذ مواقف مؤسسية بشأن قضايا السياسة العامة. الآراء المعبر عنها في منشوراتنا تعود حصرياً للمؤلفين.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
