'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button, Form, Input } from '@/components';
import { paths } from '@/config/paths';
import { loginInputSchema } from '../api/auth';
import { useLogin } from '@/features/auth/hooks/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

const loginErrorMessageLabel: Record<string, string> = {
  Unauthorized: 'Invalid email or password',
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');
  return (
    <div>
      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <div className="flex flex-col items-center justify-center">
              {login.error && typeof login.error.message === 'string' && (
                <span className="text-red-500 text-sm justify-center">
                  {loginErrorMessageLabel[login.error.message]}
                </span>
              )}
              <Button
                isLoading={login.isPending}
                type="submit"
                className="w-full bg-black-500 text-white"
                style={{
                  backgroundColor: '#000',
                }}
              >
                {login.isPending ? 'Logging in...' : 'Log in'}
              </Button>
            </div>
          </>
        )}
      </Form>
      <div
        className="mt-2 flex items-center justify-center text-sm"
        style={{ marginTop: '1rem', gap: '0.35rem' }}
      >
        <span className="mr-1">Don&apos;t have an account?</span>
        <div className="">
          <NextLink
            href={paths.auth.signup.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Signup
          </NextLink>
        </div>
      </div>
    </div>
  );
};
