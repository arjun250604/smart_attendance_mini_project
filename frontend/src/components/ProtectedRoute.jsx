"use client";

import { useEffect, useState } from 'react';
import { useRouter } from '../hooks/useRouter';
import { useAuth } from '../context/AuthContext';

function roleDest(role) {
  if (role === 'admin')   return '/dashboard';
  if (role === 'teacher') return '/faculty';
  if (role === 'student') return '/student';
  return '/login';
}

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!user) {
      router.replace('/login');
    } else if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace(roleDest(user.role));
    }
  }, [user, allowedRoles, router, mounted]);

  if (!mounted) return null;
  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return children;
}
