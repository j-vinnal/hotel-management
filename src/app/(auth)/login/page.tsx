'use client';

import FormInput from '@/components/FormInput';
import useAccountActions from '@/hooks/identity/useAccountActions';
import { ILoginData, LoginSchema } from '@/interfaces/auth/ILoginData';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const { loginAccount } = useAccountActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ILoginData>({
    defaultValues: {
      email: 'admin@hotelx.com',
      password: 'Foo.Bar1',
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = async (data: ILoginData) => {
    try {
      await loginAccount(data);
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <h2>Log in</h2>
        <hr />

        {errors.root && (
          <div className="text-danger">{errors.root?.message}</div>
        )}

        <form onSubmit={handleSubmit(handleLogin)}>
          <FormInput
            id="email"
            label="Email"
            type="email"
            register={register('email', { required: 'Email is required' })}
            error={errors.email}
            autoComplete="email"
            placeholder="name@example.com"
          />

          <FormInput
            id="password"
            label="Password"
            type="password"
            register={register('password', {
              required: 'Password is required',
            })}
            error={errors.password}
            autoComplete="password"
            placeholder="password"
          />

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-100 btn btn-lg btn-primary">
              Log in
            </button>
          </div>
        </form>

        <div className="py-4 text-center">
          <p className="be-1">
            {"Don't have an account?"}
            <Link
              href="/register"
              className="text-primary text-decoration-none ms-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
