import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(12, 'Use at least 12 characters')
});
type LoginInput = z.infer<typeof LoginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (_data: LoginInput) => {
    // POST /api/v1/auth/login — implementation pending.
  };

  return (
    <>
      <Helmet>
        <title>Sign in · IPISH Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-surface border border-border shadow-sm rounded-lg p-8"
          noValidate
        >
          <h1 className="font-serif text-2xl mb-1">Sign in</h1>
          <p className="text-sm text-text-muted mb-6">Admin access only.</p>

          <Field
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            inputProps={register('email')}
          />
          <Field
            label="Password"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            inputProps={register('password')}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full h-11 rounded-md bg-primary text-white disabled:opacity-50 hover:bg-primary-hover"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </>
  );
}

function Field({
  label,
  type,
  autoComplete,
  error,
  inputProps
}: {
  label: string;
  type: string;
  autoComplete: string;
  error?: string;
  inputProps: ReturnType<ReturnType<typeof useForm<{ email: string; password: string }>>['register']>;
}) {
  const id = `field-${label.toLowerCase()}`;
  const errorId = `${id}-error`;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="w-full h-11 px-3 rounded-md border border-border bg-surface focus:border-primary"
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="mt-1 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
