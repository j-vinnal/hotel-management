'use client';

import {ILoginData} from '@/interfaces/auth/ILoginData';
import {IRegisterData} from '@/interfaces/auth/IRegisterData';
import IdentityService from '@/services/IdentityService';
import {JWTContext} from '@/states/contexts/JWTContext';
import {UserContext} from '@/states/contexts/UserContext';
import {handleResponseErrors} from '@/utils/handleResponseErrors';
import {useRouter} from 'next/navigation';
import {useContext} from 'react';

/**
 * Custom hook to manage account actions such as login, logout, and registration.
 *
 * @returns {object} An object containing methods for account actions.
 */
const useAccountActions = () => {
  const {jwtResponse, setJwtResponse} = useContext(JWTContext)!;
  const {setUser} = useContext(UserContext)!;
  const router = useRouter();

  /**
   * Logs in a user account.
   *
   * @param {ILoginData} account - The login data for the account.
   * @throws Will throw an error if the login process fails.
   */
  const loginAccount = async (account: ILoginData) => {
    const identityService = new IdentityService();
    try {
      const response = await identityService.login(account);
      handleResponseErrors(response);
      setJwtResponse(response.data);
      router.push('/');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /**
   * Logs out the current user account.
   *
   * @throws Will throw an error if the logout process fails.
   */
  const logoutAccount = async () => {
    const identityService = new IdentityService();
    try {
      await identityService.logout(jwtResponse!, router);
      setJwtResponse(undefined);
      setUser(undefined);
      router.push('/');
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /**
   * Registers a new user account.
   *
   * @param {IRegisterData} account - The registration data for the account.
   * @throws Will throw an error if the registration process fails.
   */
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

  return {loginAccount, logoutAccount, registerAccount};
};

export default useAccountActions;
