export function formatGHS(amount: number): string {
  return `₵${amount.toFixed(2)}`;
}

export function formatPhoneGH(phone: string): string {
  return phone.startsWith("+233") ? phone : `+233 ${phone.replace(/^0/, "")}`;
}
