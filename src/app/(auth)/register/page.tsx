'use client';

import FormInput from '@/components/FormInput';
import useAccountActions from '@/hooks/identity/useAccountActions';
import { IRegisterData, RegisterSchema } from '@/interfaces/auth/IRegisterData';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const { registerAccount } = useAccountActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<IRegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegister = async (data: IRegisterData) => {
    try {
      await registerAccount(data);
    } catch (error) {
      toast.error((error as Error).message);
      setError('root', { type: 'server', message: (error as Error).message });
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <h2>Create a new account</h2>
        <hr />

        {errors.root && (
          <div className="text-danger">{errors.root?.message}</div>
        )}

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormInput
            id="firstName"
            label="First Name"
            type="text"
            register={register('firstName')}
            error={errors.firstName}
            autoComplete="given-name"
          />
          <FormInput
            id="lastName"
            label="Last Name"
            type="text"
            register={register('lastName')}
            error={errors.lastName}
            autoComplete="family-name"
          />
          <FormInput
            id="email"
            label="Email"
            type="email"
            register={register('email')}
            error={errors.email}
            autoComplete="email"
          />
          <FormInput
            id="personalCode"
            label="Personal Code"
            type="text"
            register={register('personalCode')}
            error={errors.personalCode}
            autoComplete="off"
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            register={register('password')}
            error={errors.password}
            autoComplete="new-password"
          />

          <FormInput
            id="confirmedPassword"
            label="Confirm Password"
            type="password"
            register={register('confirmedPassword')}
            error={errors.confirmedPassword}
            autoComplete="new-password"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-100 btn btn-lg btn-primary">
            Register
          </button>
        </form>

        <div className="py-4 text-center">
          <p className="be-1">
            {"Already have an account?"}
            <Link
              href="/login"
              className="text-primary text-decoration-none ms-1">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
