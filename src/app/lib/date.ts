import { format as dateFnsFormat } from 'date-fns';
import { parse as dateFnsParse } from 'date-fns';
import ru from 'date-fns/locale/ru'

import { DateUtils } from "react-day-picker/lib/src";

export const format = 'dd.MM.YYYY'

export function parseDate(str) {
  const parsed = dateFnsParse(str, format, new Date(), { locale: ru });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

export function formatDate(date, format) {
  const formatted = dateFnsFormat(date, format, { locale: ru });
  return formatted;
}



