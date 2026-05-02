import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  body: string;
}

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitStatus('success');
      reset();
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <>
      <Helmet><title>اتصل بنا · منتدى سياسات الشرق الأوسط</title></Helmet>
      <div className="max-w-content mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
              تواصل معنا
            </h1>
            <p className="text-lg text-text-muted mb-8 leading-relaxed">
              نرحب باستفسارات الباحثين والصحفيين والجمهور. يرجى استخدام النموذج للتواصل معنا، وتوجيه رسالتك إلى القسم المناسب باستخدام حقل الموضوع.
            </p>
            <div className="space-y-4 text-text">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted">الاستفسارات الصحفية</h3>
                <p>press@mepf.example.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted">معلومات عامة</h3>
                <p>info@mepf.example.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-text-muted">المكتب</h3>
                <p>شارع مراكز الفكر، مبنى ١٢٣<br />جناح ٤٠٠<br />واشنطن، العاصمة ٢٠٠٠١</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border shadow-sm rounded-lg p-6 md:p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="text-accent text-4xl mb-4">✓</div>
                <h2 className="font-serif text-2xl mb-2">تم إرسال الرسالة</h2>
                <p className="text-text-muted">شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 text-primary hover:underline text-sm font-medium"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-200">
                    حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقاً.
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-1">الاسم</label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: 'الاسم مطلوب' })}
                    className="w-full px-3 py-2 bg-bg border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-1">البريد الإلكتروني</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'البريد الإلكتروني مطلوب',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'عنوان البريد الإلكتروني غير صالح' }
                    })}
                    className="w-full px-3 py-2 bg-bg border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text mb-1">الموضوع</label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject', { required: 'الموضوع مطلوب' })}
                    className="w-full px-3 py-2 bg-bg border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-text mb-1">الرسالة</label>
                  <textarea
                    id="body"
                    rows={5}
                    {...register('body', { 
                      required: 'الرسالة مطلوبة',
                      minLength: { value: 20, message: 'يجب أن تحتوي الرسالة على ٢٠ حرفاً على الأقل' }
                    })}
                    className="w-full px-3 py-2 bg-bg border border-border rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                  ></textarea>
                  {errors.body && <p className="mt-1 text-xs text-red-600">{errors.body.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 inline-flex items-center justify-center rounded-md bg-primary text-white font-medium hover:bg-primary-hover disabled:opacity-70 transition-colors"
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
