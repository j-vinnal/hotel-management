'use client';

import { ILoginData } from '@/interfaces/auth/ILoginData';
import { IRegisterData } from '@/interfaces/auth/IRegisterData';
import IdentityService from '@/services/IdentityService';
import { JWTContext } from '@/states/contexts/JWTContext';
import { handleResponseErrors } from '@/utils/handleResponseErrors';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const useAccountActions = () => {
  const { jwtResponse, setJwtResponse } = useContext(JWTContext)!;
  const router = useRouter();

  const loginAccount = async (account: ILoginData) => {
    const identityService = new IdentityService();
    try {
      const response = await identityService.login(account);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      router.push('/account');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const logoutAccount = async () => {
    const identityService = new IdentityService();
    try {
      await identityService.logout(jwtResponse!, router);
      setJwtResponse(undefined);
      router.push('/');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const registerAccount = async (account: IRegisterData) => {
    const identityService = new IdentityService();
    try {
      const response = await identityService.register(account);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      router.push('/');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { loginAccount, logoutAccount, registerAccount };
};

export default useAccountActions;
