/**
 * Handles errors in the API response.
 *
 * @param {any} response - The API response to check for errors.
 * @throws Will throw an error if the response contains errors.
 */
export const handleResponseErrors = (response: any) => {
  if (response.errors && response.errors.length > 0) {
    throw new Error(response.errors.join(', '));
  }
};
