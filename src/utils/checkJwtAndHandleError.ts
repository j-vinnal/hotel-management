/**
 * Checks if the JWT response is valid and throws an error if it is not.
 *
 * @param {any} jwtResponse - The JWT response to check.
 * @throws Will throw an error if the JWT response is null.
 */
export const checkJwtAndHandleError = (jwtResponse: any) => {
  if (!jwtResponse) {
    throw new Error('JWT response is null');
  }
};
