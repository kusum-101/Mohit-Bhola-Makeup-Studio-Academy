import { useEffect, useId, useState, type FormEvent } from 'react';
import { business, links, site } from '../data/business';
import { offerings } from '../data/offerings';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { validate, type EnquiryErrors as Errors, type EnquiryValues as Values } from '../lib/validate';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';

const empty: Values = { name: '', phone: '', email: '', interest: '', date: '', message: '', consent: false, company: '' };

function summary(v: Values) {
  const interest = offerings.find((o) => o.id === v.interest)?.title ?? 'General enquiry';
  return [
    `Hi ${business.name}!`,
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    `Interested in: ${interest}`,
    v.date && `Preferred date: ${v.date}`,
    v.message && `Message: ${v.message}`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function EnquiryForm({ initialInterest = '', compact = false }: { initialInterest?: string; compact?: boolean }) {
  const uid = useId();
  const [values, setValues] = useState<Values>({ ...empty, interest: initialInterest });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialInterest) setValues((v) => ({ ...v, interest: initialInterest }));
  }, [initialInterest]);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (values.company) return; // honeypot: silently ignore bots
    if (!site.enquiryEndpoint) {
      setStatus('unconfigured');
      return;
    }
    setStatus('submitting');
    try {
      const { company: _hp, ...payload } = values;
      const res = await fetch(site.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          interest: offerings.find((o) => o.id === values.interest)?.title ?? values.interest,
          _subject: `New enquiry from ${values.name}`,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      setValues({ ...empty });
    } catch {
      setStatus('error');
    }
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary(values));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-gold/40 bg-white p-8 text-center">
        <p className="font-display text-3xl text-wine">Thank you!</p>
        <p className="mt-3 text-muted">Your enquiry has been received. The studio will get back to you shortly.</p>
        <button type="button" className="btn btn-ghost mt-6" onClick={() => setStatus('idle')}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const id = (k: string) => `${uid}-${k}`;
  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={id(k) + '-err'} className="mt-1.5 text-xs font-medium text-red-700">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Values) => ({
    id: id(k),
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? id(k) + '-err' : undefined,
  });
  const label = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-ink/70';

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4" aria-label="Enquiry form">
      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label htmlFor={id('name')} className={label}>Full name *</label>
          <input {...aria('name')} className="field" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
          {err('name')}
        </div>
        <div>
          <label htmlFor={id('phone')} className={label}>Mobile number *</label>
          <input {...aria('phone')} className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" value={values.phone} onChange={(e) => set('phone', e.target.value)} />
          {err('phone')}
        </div>
        <div>
          <label htmlFor={id('email')} className={label}>Email <span className="normal-case tracking-normal text-ink/45">(optional)</span></label>
          <input {...aria('email')} className="field" type="email" autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} />
          {err('email')}
        </div>
        <div>
          <label htmlFor={id('interest')} className={label}>Interested in *</label>
          <select {...aria('interest')} className="field" value={values.interest} onChange={(e) => set('interest', e.target.value)}>
            <option value="">Select a service or course</option>
            <optgroup label="Makeup services">
              {offerings.filter((o) => o.kind === 'service').map((o) => <option key={o.id} value={o.id}>{o.title}</option>)}
            </optgroup>
            <optgroup label="Academy courses">
              {offerings.filter((o) => o.kind === 'course').map((o) => <option key={o.id} value={o.id}>{o.title}</option>)}
            </optgroup>
            <option value="other">Something else</option>
          </select>
          {err('interest')}
        </div>
      </div>
      <div>
        <label htmlFor={id('date')} className={label}>Event / preferred date <span className="normal-case tracking-normal text-ink/45">(optional)</span></label>
        <input {...aria('date')} className="field" type="date" value={values.date} onChange={(e) => set('date', e.target.value)} />
      </div>
      <div>
        <label htmlFor={id('message')} className={label}>Message <span className="normal-case tracking-normal text-ink/45">(optional)</span></label>
        <textarea {...aria('message')} className="field min-h-24 resize-y" rows={compact ? 3 : 4} maxLength={1000} placeholder="Tell us about your occasion, look or course goals" value={values.message} onChange={(e) => set('message', e.target.value)} />
        {err('message')}
      </div>
      {/* Honeypot – hidden from people and assistive tech */}
      <div className="hidden" aria-hidden="true">
        <label>Company<input tabIndex={-1} autoComplete="off" name="company" value={values.company} onChange={(e) => set('company', e.target.value)} /></label>
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input {...aria('consent')} type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-wine" checked={values.consent} onChange={(e) => set('consent', e.target.checked)} />
          I agree to be contacted by phone, WhatsApp or email about this enquiry.
        </label>
        {err('consent')}
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
        {status === 'submitting' ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" /> Sending…
          </>
        ) : (
          'Send enquiry'
        )}
      </button>

      <div aria-live="polite">
        {status === 'error' && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-800">
            Sorry, your enquiry couldn’t be sent. Please try again{links.whatsapp || business.instagram ? ' or message the studio directly' : ''}.
          </p>
        )}
        {status === 'unconfigured' && (
          <div role="alert" className="rounded-xl border border-gold/50 bg-sand/60 p-4 text-sm text-ink">
            <p className="font-semibold">Online enquiries aren’t connected yet. Your details have not been sent.</p>
            <p className="mt-1 text-muted">Please send them to the studio directly:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {links.whatsapp && (
                <a className="btn btn-primary min-h-10 px-4" href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(summary(values))}`} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Send on WhatsApp
                </a>
              )}
              <a className="btn btn-ghost min-h-10 px-4" href={business.instagram.url} target="_blank" rel="noopener noreferrer" onClick={copySummary}>
                <InstagramIcon /> DM on Instagram
              </a>
            </div>
            {copied && <p className="mt-2 text-xs text-muted">Your enquiry text is copied — paste it into the DM.</p>}
          </div>
        )}
      </div>
    </form>
  );
}
