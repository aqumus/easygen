'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { Link } from '@/components/link';
import { paths } from '@/config/paths';
import { useUser } from '@/features/auth';

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === paths.auth.login.getHref();
  const title = isLoginPage
    ? 'Log in to your account'
    : 'Sign up for an account';

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  useEffect(() => {
    if (user.data) {
      router.replace(
        `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.home.getHref()}`,
      );
    }
  }, [user.data, router, redirectTo]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};
