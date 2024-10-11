export const handleResponseErrors = (response: any) => {
  if (response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join(', '));
  }
};