export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  interest: string;
  date: string;
  message: string;
  consent: boolean;
  company: string;
};
export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

export function validate(v: EnquiryValues): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  const digits = v.phone.replace(/[\s\-()]/g, '');
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) e.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'That email doesn’t look right.';
  if (!v.interest) e.interest = 'Choose what you’re interested in.';
  if (v.message.length > 1000) e.message = 'Please keep it under 1000 characters.';
  if (!v.consent) e.consent = 'Please allow us to contact you about this enquiry.';
  return e;
}
