'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { paths } from '@/config/paths';
import { SignupForm } from '@/features/auth/components/signup-form';

const SignupPage = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  return (
    <SignupForm
      onSuccess={() =>
        router.replace(
          `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.home.getHref()}`,
        )
      }
    />
  );
};

export default SignupPage;
