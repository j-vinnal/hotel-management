export const checkJwtAndHandleError = (jwtResponse: any) => {
  if (!jwtResponse) {
    throw new Error('JWT response is null');
  }
};
