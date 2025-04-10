// src/composables/useDateFormat.js
import { format } from "date-fns";
import { de } from "date-fns/locale";

export function useDateFormat() {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return format(date, "dd.MM.yyyy HH:mm 'Uhr'", { locale: de });
  };

  return {
    formatDate,
  };
}
