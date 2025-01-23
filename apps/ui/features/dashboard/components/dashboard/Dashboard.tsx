'use client';

import { useUser } from '@/features/auth';
import { redirect } from 'next/navigation';
import { paths } from '@/config/paths';

export function Dashboard() {
  const { data: user } = useUser();

  if (!user) {
    redirect(paths.auth.login.getHref());
  }

  return (
    <div className="h-screen flex items-center justify-center gap-1">
      <span>Welcome to the application &nbsp;</span>
      <b className="p-1">{user?.name}</b>
    </div>
  );
}
