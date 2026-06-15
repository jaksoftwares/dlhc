import { LetterheadSchema } from "@/types/template";

export const masterTemplates: LetterheadSchema[] = [
  {
    id: "corporate-standard",
    name: "Corporate Standard",
    description: "Traditional and reliable. Best for enterprise and financial institutions.",
    category: "Corporate",
    layout: "corporate",
    typography: {
      fontFamily: "Inter",
      headingSize: "24pt",
      bodySize: "11pt",
      footerSize: "9pt"
    },
    colors: {
      primary: "#2563EB", 
      secondary: "#64748B",
      text: "#0F172A"
    },
    margins: {
      page: "25.4mm",
      headerBottom: "15mm"
    },
    visibility: {
      showLogo: true,
      showCompanyName: true,
      showRegistration: true,
      showTaxPin: false,
      showEmail: true,
      showPhone: true,
      showWebsite: true,
      showAddress: true
    }
  },
  {
    id: "executive-centered",
    name: "Executive Centered",
    description: "Formal and elegant with centered alignment. Ideal for legal counsel.",
    category: "Legal",
    layout: "executive",
    typography: {
      fontFamily: "Merriweather",
      headingSize: "28pt",
      bodySize: "12pt",
      footerSize: "10pt"
    },
    colors: {
      primary: "#1E293B", 
      secondary: "#94A3B8",
      text: "#1E293B"
    },
    margins: {
      page: "25.4mm",
      headerBottom: "20mm"
    },
    visibility: {
      showLogo: true,
      showCompanyName: true,
      showRegistration: false,
      showTaxPin: false,
      showEmail: true,
      showPhone: true,
      showWebsite: true,
      showAddress: true
    }
  },
  {
    id: "modern-edge",
    name: "Modern Edge",
    description: "Clean spacing and modern alignment. Ideal for tech and agencies.",
    category: "Technology",
    layout: "modern",
    typography: {
      fontFamily: "Open Sans",
      headingSize: "20pt",
      bodySize: "10pt",
      footerSize: "8.5pt"
    },
    colors: {
      primary: "#0F172A", 
      secondary: "#3B82F6",
      text: "#334155"
    },
    margins: {
      page: "30mm",
      headerBottom: "25mm"
    },
    visibility: {
      showLogo: true,
      showCompanyName: true,
      showRegistration: true,
      showTaxPin: true,
      showEmail: true,
      showPhone: true,
      showWebsite: true,
      showAddress: true
    }
  },
  {
    id: "minimalist-professional",
    name: "Minimalist Professional",
    description: "Maximum whitespace, minimal visual interruption.",
    category: "Consulting",
    layout: "minimalist",
    typography: {
      fontFamily: "Roboto",
      headingSize: "18pt",
      bodySize: "11pt",
      footerSize: "9pt"
    },
    colors: {
      primary: "#000000", 
      secondary: "#A1A1AA",
      text: "#27272A"
    },
    margins: {
      page: "35mm",
      headerBottom: "30mm"
    },
    visibility: {
      showLogo: true,
      showCompanyName: false,
      showRegistration: false,
      showTaxPin: false,
      showEmail: true,
      showPhone: false,
      showWebsite: true,
      showAddress: true
    }
  },
  {
    id: "structural-block",
    name: "Structural Block",
    description: "A strong brand color block header that bleeds to the edge.",
    category: "Engineering",
    layout: "structural",
    typography: {
      fontFamily: "Inter",
      headingSize: "26pt",
      bodySize: "11pt",
      footerSize: "9pt"
    },
    colors: {
      primary: "#0EA5E9", 
      secondary: "#E2E8F0",
      text: "#1E293B"
    },
    margins: {
      page: "25.4mm",
      headerBottom: "20mm"
    },
    visibility: {
      showLogo: true,
      showCompanyName: true,
      showRegistration: false,
      showTaxPin: false,
      showEmail: true,
      showPhone: true,
      showWebsite: true,
      showAddress: true
    }
  }
];
