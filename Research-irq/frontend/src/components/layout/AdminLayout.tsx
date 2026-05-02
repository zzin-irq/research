import { Outlet, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../hooks/useAuth';

const ADMIN_NAV = [
  { to: '/admin', label: 'لوحة التحكم', end: true },
  { to: '/admin/articles', label: 'المقالات' },
  { to: '/admin/media', label: 'الوسائط' }
];
const SUPER_NAV = [
  { to: '/admin/users', label: 'المستخدمين' },
  { to: '/admin/audit', label: 'سجل المراجعة' }
];

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-surface-muted text-text grid grid-cols-[240px_1fr]">
      <Helmet>
        <title>الإدارة · منتدى سياسات الشرق الأوسط</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <aside className="bg-surface border-e border-border p-4 flex flex-col">
        <div className="flex items-center gap-2 px-2 py-3">
          <span className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-serif">م</span>
          <span className="font-medium">الإدارة</span>
          {user && (
            <span className="ms-auto text-xs px-2 py-1 rounded-full bg-accent-soft text-accent">
              {user.role}
            </span>
          )}
        </div>

        <nav aria-label="الإدارة" className="mt-4 flex flex-col gap-1">
          {ADMIN_NAV.map(item => (
            <AdminLink key={item.to} {...item} />
          ))}
          {user?.role === 'super' && SUPER_NAV.map(item => (
            <AdminLink key={item.to} {...item} />
          ))}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="mt-auto h-10 rounded-md border border-border text-sm hover:bg-surface-muted"
        >
          تسجيل الخروج
        </button>
      </aside>

      <main className="p-6 md:p-10 max-w-content">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLink({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `px-3 h-9 flex items-center rounded-md text-sm ${
          isActive
            ? 'bg-accent-soft text-primary'
            : 'text-text-muted hover:text-text hover:bg-surface-muted'
        }`
      }
    >
      {label}
    </NavLink>
  );
}
