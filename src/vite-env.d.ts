/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_ENQUIRY_ENDPOINT?: string;
  readonly VITE_PHONE?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_EMAIL?: string;
  readonly VITE_STREET_ADDRESS?: string;
  readonly VITE_POSTAL_CODE?: string;
  readonly VITE_OPENING_HOURS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
