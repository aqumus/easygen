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

const signupErrorMessages: Record<string, string> = {
  EMAIL_ALREADY_IN_USE: 'Email already in use',
  TRY_AGAIN: 'Missed your request, try again',
};

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
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

            <div className="flex flex-col gap-2 justify-center items-center">
              {registering.error &&
                typeof registering.error.message === 'string' && (
                  <span className="text-sm text-red-500">
                    {
                      signupErrorMessages[
                        registering.error.message ?? 'TRY_AGAIN'
                      ]
                    }
                  </span>
                )}
              <Button
                isLoading={registering.isPending}
                type="submit"
                className="w-full text-white"
                style={{
                  backgroundColor: '#000',
                }}
              >
                {registering.isPending ? 'Signing up...' : 'Signup'}
              </Button>
            </div>
          </>
        )}
      </Form>
      <div
        className="mt-2 text-sm flex items-center justify-center"
        style={{ marginTop: '1rem', gap: '0.5rem' }}
      >
        <span>Already have an account?</span>
        <div className="">
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
