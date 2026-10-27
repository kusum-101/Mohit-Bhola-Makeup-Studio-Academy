import { createContext, useContext } from 'react';

export interface EnquiryApi {
  /** Opens the enquiry popup, optionally preselecting a service/course id. */
  open: (interest?: string) => void;
}

export const EnquiryContext = createContext<EnquiryApi>({ open: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);
