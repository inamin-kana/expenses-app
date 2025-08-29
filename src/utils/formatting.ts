import { format } from "date-fns";

export function formatMonth(date: Date):string {
  return format(date, "MM-yyyy");
}

export function formatCurrency(amount: number):string {
  return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}

export const changeDayFormat = (s: string): string => {
  const m = s.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return s;               // すでに yyyy-MM-dd などなら触らない
  const [, dd, mm, yyyy] = m;
  return `${yyyy}-${mm}-${dd}`;
};
