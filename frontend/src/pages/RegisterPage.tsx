import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthFormField } from '@/components/auth/AuthFormField';
import { registerSchema, type RegisterFormValues } from '@/lib/authSchema';
import { register as registerUser } from '@/api/auth.api';

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    try {
      await registerUser(data);
      // TODO: store token and redirect to "/" on success
    } catch {
      // TODO: show inline error or toast notification
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start managing your wishlist today</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <AuthFormField
                name="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
              />
              <AuthFormField
                name="password"
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
              />
              <AuthFormField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
              />
              <Button type="submit" disabled={isLoading} className="mt-2 w-full">
                {isLoading ? 'Creating account…' : 'Create account'}
              </Button>
            </form>
          </FormProvider>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
