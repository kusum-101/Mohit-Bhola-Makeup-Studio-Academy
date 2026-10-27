import { useEffect, useRef } from 'react';
import { offerings } from '../data/offerings';
import { EnquiryForm } from './EnquiryForm';
import { CloseIcon } from './Icons';
import { Img } from '../lib/Img';

export function EnquiryModal({ open, interest, onClose }: { open: boolean; interest: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const selected = offerings.find((o) => o.id === interest);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="enquiry-title"
      className="m-auto max-h-[92dvh] w-[min(56rem,calc(100%-2rem))] overflow-hidden rounded-3xl bg-ivory p-0 text-ink shadow-2xl"
    >
      {open && (
        <div className="grid max-h-[92dvh] md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative hidden md:block">
            <Img name={selected?.image ?? 'bridal'} alt="" sizes="22rem" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-3xl italic text-white">
              {selected ? selected.title : 'Let’s create your look'}
            </p>
          </div>
          <div className="overflow-y-auto p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Enquire</p>
                <h2 id="enquiry-title" className="mt-2 text-3xl sm:text-4xl">Book a consultation</h2>
              </div>
              <button type="button" onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 hover:border-wine hover:text-wine" aria-label="Close enquiry form">
                <CloseIcon />
              </button>
            </div>
            <EnquiryForm initialInterest={interest} compact />
          </div>
        </div>
      )}
    </dialog>
  );
}
