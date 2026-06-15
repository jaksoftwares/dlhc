export type LayoutType = 'corporate' | 'executive' | 'modern' | 'minimalist' | 'structural';
export type FontFamily = 'Merriweather' | 'Lora' | 'Playfair Display' | 'Inter' | 'Roboto' | 'Open Sans';

export interface LetterheadSchema {
  id: string;
  name: string;
  description: string;
  category: string;
  layout: LayoutType;
  typography: {
    fontFamily: FontFamily;
    headingSize: string;
    bodySize: string;
    footerSize: string;
  };
  colors: {
    primary: string; // Hex code, defaults to Company Profile Primary
    secondary: string; // Hex code, for accents or text
    text: string;
  };
  margins: {
    page: string; // e.g. '25.4mm' (1 inch)
    headerBottom: string; // Spacing below header
  };
  visibility: {
    showLogo: boolean;
    showCompanyName: boolean;
    showRegistration: boolean;
    showTaxPin: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showWebsite: boolean;
    showAddress: boolean;
  };
}

export interface CompanyProfileData {
  companyName: string;
  logoUrl?: string;
  registrationNumber?: string;
  taxPin?: string;
  email?: string;
  phone?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  primaryColor: string;
  secondaryColor: string;
}
