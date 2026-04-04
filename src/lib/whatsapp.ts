const rawWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export function getWhatsAppNumberDigits(): string {
  return rawWhatsAppNumber.replace(/\D/g, "");
}

export function getWhatsAppDisplayNumber(): string {
  const digits = getWhatsAppNumberDigits();
  if (!digits) return "";

  if (digits.length === 12 && digits.startsWith("52")) {
    return `+52 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  return `+${digits}`;
}

export function getWhatsAppUrl(message?: string): string {
  const digits = getWhatsAppNumberDigits();
  if (!digits) return "";

  if (!message) {
    return `https://wa.me/${digits}`;
  }

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
