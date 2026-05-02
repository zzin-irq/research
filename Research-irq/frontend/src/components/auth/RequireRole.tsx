import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

type Role = 'user' | 'admin' | 'super';

const ROLE_RANK: Record<Role, number> = { user: 0, admin: 1, super: 2 };

export function RequireRole({
  role,
  children
}: {
  role: Role;
  children: React.ReactNode;
}) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === 'loading') return null;
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  if (ROLE_RANK[user.role] < ROLE_RANK[role]) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
}
