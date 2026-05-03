import { Outlet, Link, NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'الرئيسية', color: 'primary' },
  { to: '/research', label: 'الأبحاث', color: 'blue' },
  { to: '/events', label: 'الفعاليات', color: 'orange' },
  { to: '/about', label: 'من نحن', color: 'pink' },
  { to: '/contact', label: 'اتصل بنا', color: 'teal' }
];

function getTabClasses(color: string, isActive: boolean) {
  const base = "text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap";
  
  if (!isActive) {
    return `${base} text-text-muted hover:bg-surface-muted hover:text-text`;
  }
  
  // Pill look when active:
  const activeBase = `${base} bg-surface-muted shadow-sm border border-border`;
  
  switch(color) {
    case 'primary': return `${activeBase} text-primary dark:text-indigo-400`;
    case 'blue': return `${activeBase} text-blue-600 dark:text-blue-400`;
    case 'emerald': return `${activeBase} text-emerald-600 dark:text-emerald-400`;
    case 'purple': return `${activeBase} text-purple-600 dark:text-purple-400`;
    case 'orange': return `${activeBase} text-orange-600 dark:text-orange-400`;
    case 'pink': return `${activeBase} text-pink-600 dark:text-pink-400`;
    case 'teal': return `${activeBase} text-teal-600 dark:text-teal-400`;
    default: return `${activeBase} text-primary`;
  }
}

export function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <a href="#main" className="skip-link">تخطي إلى المحتوى</a>

      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border py-3">
        <div className="max-w-wide mx-auto flex items-center justify-between px-4 md:px-12 gap-6">
          {/* Logo top-right in RTL — image already includes the wordmark */}
          <Link to="/" className="flex items-center" aria-label="منتدى سياسات الشرق الأوسط — الرئيسية">
            <img
              src="/logo.jpg"
              alt="منتدى سياسات الشرق الأوسط"
              width="56"
              height="56"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Centered nav (Pill style) */}
          <nav aria-label="الأساسية" className="flex-1 hidden md:flex justify-center gap-2 items-center">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => getTabClasses(item.color, isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div />
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-white mt-24">
        <div className="max-w-wide mx-auto px-4 md:px-12 py-16 grid gap-12 md:grid-cols-4">
          <div>
            <div className="mb-6">
              <img
                src="/logo.jpg"
                alt="منتدى سياسات الشرق الأوسط"
                width="160"
                height="160"
                className="w-32 h-auto rounded-lg bg-white p-2"
              />
            </div>
            <p className="text-sm text-indigo-200 leading-relaxed max-w-xs">
              أبحاث مستقلة حول القضايا التي ترسم معالم الحياة العامة، من السياسة والاقتصاد إلى العلاقات الدولية.
            </p>
          </div>
          <FooterCol title="الأبحاث" links={[
            ['أحدث الإصدارات', '/research'],
            ['الموضوعات', '/topics'],
            ['الدراسات', '/research?type=publication']
          ]} />
          <FooterCol title="المنتدى" links={[
            ['من نحن', '/about'],
            ['الخبراء', '/people'],
            ['الفعاليات', '/events']
          ]} />
          <FooterCol title="تواصل معنا" links={[
            ['اتصل بنا', '/contact'],
            ['الصحافة', '/about#press'],
            ['النشرة البريدية', '/contact#newsletter']
          ]} />
        </div>
        <div className="border-t border-white/10">
          <p className="max-w-wide mx-auto px-4 md:px-12 py-6 text-sm text-indigo-300">
            © {new Date().getFullYear()} منتدى سياسات الشرق الأوسط. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-base font-bold text-white mb-6">{title}</p>
      <ul className="space-y-4">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="text-sm text-indigo-200 hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
