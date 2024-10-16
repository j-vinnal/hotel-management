import {format} from 'date-fns';

export const formatDate = (
  date: Date | undefined,
  dateFormat: string = 'dd-MM-yyyy'
): string => {
  return date ? format(date, dateFormat) : '';
};
