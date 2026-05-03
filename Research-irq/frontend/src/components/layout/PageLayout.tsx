import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'الرئيسية' },
  { to: '/research', label: 'الأبحاث' },
  { to: '/events', label: 'الفعاليات' },
  { to: '/about', label: 'من نحن' },
  { to: '/contact', label: 'اتصل بنا' }
];

export function PageLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <a href="#main" className="skip-link">تخطي إلى المحتوى</a>

      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="max-w-wide mx-auto flex items-center justify-between px-4 md:px-12 h-14 md:h-16">

          {/* Logo — text wordmark (no image dependency) */}
          <Link to="/" className="font-serif font-bold text-base md:text-lg text-primary leading-tight shrink-0" aria-label="منتدى سياسات الشرق الأوسط — الرئيسية">
            منتدى سياسات الشرق الأوسط
          </Link>

          {/* Desktop nav */}
          <nav aria-label="الأساسية" className="hidden md:flex gap-1 items-center">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-surface-muted text-primary border border-border shadow-sm'
                      : 'text-text-muted hover:text-text hover:bg-surface-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-muted transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="القائمة"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-text-muted transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text-muted transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-text-muted transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-1">
            {NAV.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-surface-muted text-primary'
                      : 'text-text-muted hover:text-text hover:bg-surface-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-white mt-12 md:mt-24">
        <div className="max-w-wide mx-auto px-4 md:px-12 py-10 md:py-16 grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-serif font-bold text-lg text-white mb-4">منتدى سياسات الشرق الأوسط</p>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              أبحاث مستقلة حول القضايا التي ترسم معالم الحياة العامة، من السياسة والاقتصاد إلى العلاقات الدولية.
            </p>
          </div>
          <FooterCol title="الأبحاث" links={[
            ['أحدث الإصدارات', '/research'],
            ['الموضوعات', '/topics'],
          ]} />
          <FooterCol title="المنتدى" links={[
            ['من نحن', '/about'],
            ['الخبراء', '/people'],
            ['الفعاليات', '/events']
          ]} />
          <FooterCol title="تواصل معنا" links={[
            ['اتصل بنا', '/contact'],
          ]} />
        </div>
        <div className="border-t border-white/10">
          <p className="max-w-wide mx-auto px-4 md:px-12 py-4 text-sm text-white/50">
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
      <p className="text-sm font-bold text-white mb-4">{title}</p>
      <ul className="space-y-3">
        {links.map(([label, to]) => (
          <li key={to}>
            <Link to={to} className="text-sm text-white/70 hover:text-white transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
