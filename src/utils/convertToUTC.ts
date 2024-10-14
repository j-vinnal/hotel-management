export const convertToUTC = (date?: Date | string): Date | undefined => {
  if (!date) return undefined;
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return new Date(
      Date.UTC(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate()
      )
    );
  }
