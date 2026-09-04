export function isValidNin(value: string): boolean {
  return /^\d{11}$/.test(value.trim());
}

export function maskNin(value: string): string {
  const digits = value.trim();
  if (digits.length < 4) return "•".repeat(digits.length);
  return "•".repeat(digits.length - 4) + digits.slice(-4);
}

export type NinVerificationStatus = "unsubmitted" | "pending" | "verified" | "rejected";
