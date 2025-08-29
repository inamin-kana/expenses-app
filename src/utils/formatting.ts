import { format } from "date-fns";

export function formatMonth(date: Date):string {
  return format(date, "MM-yyyy");
}

export function formatCurrency(amount: number):string {
  return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}

// dd-MM-yyyy → yyyy-MM-dd 
export const changeDayFormat = (date: string): string => {
  const changedDate = date.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!changedDate) return date;
  const [, dd, mm, yyyy] = changedDate;
  return `${yyyy}-${mm}-${dd}`;
};
