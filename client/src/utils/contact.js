const defaultMessage = encodeURIComponent("Hello, I'm interested in a course at Nexavora Technologies LLP.");
const phoneDigits = (import.meta.env.VITE_PHONE_LINK || '9686712017').replace(/[^0-9+]/g, '');
const whatsappDigits = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');

export const phoneDisplay = import.meta.env.VITE_PHONE_DISPLAY || '9686712017';
export const phoneHref = `tel:${phoneDigits}`;
export const whatsappHref = whatsappDigits
  ? `https://wa.me/${whatsappDigits}?text=${defaultMessage}`
  : '';
