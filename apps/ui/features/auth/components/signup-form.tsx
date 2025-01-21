'use client';

import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { Button, Form, Input } from '@/components';
import { paths } from '@/config/paths';
import { useSignup } from '@/features/auth/hooks/auth';
import { signupInputSchema } from '../api/auth';

type SignupFormProps = {
  onSuccess: () => void;
};

export const SignupForm = ({
  onSuccess,
}: SignupFormProps) => {
  const registering = useSignup({ onSuccess });
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => {
          registering.mutate(values);
        }}
        schema={signupInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="Name"
              error={formState.errors['name']}
              registration={register('name')}
            />
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

            <div>
              <Button
                isLoading={registering.isPending}
                type="submit"
                className="w-full"
              >
                Signup
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <NextLink
            href={paths.auth.login.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </NextLink>
        </div>
      </div>
    </div>
  );
};
