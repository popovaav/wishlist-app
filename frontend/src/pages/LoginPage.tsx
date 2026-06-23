import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { AuthFormField } from '@/components/auth/AuthFormField';
import { loginSchema, type LoginFormValues } from '@/lib/authSchema';
import { login } from '@/api/auth.api';
import { setAuth } from '@/lib/auth';

export function LoginPage() {
  const navigate = useNavigate();

  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: ({ token, user }) => {
      setAuth(token, user);
      navigate('/');
    },
  });

  const serverError =
    axios.isAxiosError(error) && error.response?.data?.message
      ? (error.response.data.message as string)
      : error
        ? 'Something went wrong. Please try again.'
        : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) => mutate(data))}
              className="flex flex-col gap-4"
            >
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
                placeholder="••••••••"
              />
              {serverError && (
                <p className="text-sm text-destructive">{serverError}</p>
              )}
              <Button type="submit" disabled={isPending} className="mt-2 w-full">
                {isPending ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </FormProvider>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
