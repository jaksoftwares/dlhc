import { create } from 'zustand';
import { LetterheadSchema, CompanyProfileData } from '@/types/template';
import { masterTemplates } from '@/lib/data/templates';

interface EditorState {
  // Metadata
  designId: string | null;
  designName: string;
  saveStatus: 'saved' | 'saving' | 'unsaved' | 'error';
  zoomLevel: number;
  isExporting: boolean;

  // Template Data
  activeTemplate: LetterheadSchema;
  companyProfile: CompanyProfileData;
  documentContent: string;
  
  // Actions
  setDesignMetadata: (id: string | null, name: string) => void;
  setSaveStatus: (status: 'saved' | 'saving' | 'unsaved' | 'error') => void;
  setZoomLevel: (zoom: number | ((prev: number) => number)) => void;
  setIsExporting: (exporting: boolean) => void;
  setTemplate: (templateId: string) => void;
  updateTypography: (updates: Partial<LetterheadSchema['typography']>) => void;
  updateColors: (updates: Partial<LetterheadSchema['colors']>) => void;
  updateVisibility: (updates: Partial<LetterheadSchema['visibility']>) => void;
  setDocumentContent: (content: string) => void;
}

// Default mock data for company profile until we hook up Supabase
const defaultCompanyProfile: CompanyProfileData = {
  companyName: "Acme Corporation",
  registrationNumber: "RC-1234567",
  taxPin: "TAX-987654",
  email: "contact@acmecorp.com",
  phone: "+1 (555) 123-4567",
  website: "www.acmecorp.com",
  addressLine1: "100 Tech Hub Blvd, Suite 400",
  city: "San Francisco",
  country: "United States",
  postalCode: "94105",
  primaryColor: "#2563EB",
  secondaryColor: "#1E3A8A"
};

export const useEditorStore = create<EditorState>((set) => ({
  // Metadata
  designId: null,
  designName: "Untitled Design",
  saveStatus: 'saved',
  zoomLevel: 100,
  isExporting: false,

  // Template Data
  activeTemplate: masterTemplates[0], // Default to Corporate Standard
  companyProfile: defaultCompanyProfile,
  documentContent: "<p><strong>To Whom It May Concern,</strong></p><p>We are writing to officially confirm...</p>",

  // Actions
  setDesignMetadata: (id, name) => set({ designId: id, designName: name }),
  setSaveStatus: (status) => set({ saveStatus: status }),
  setZoomLevel: (zoom) => set((state) => ({ 
    zoomLevel: typeof zoom === 'function' ? zoom(state.zoomLevel) : zoom 
  })),
  setIsExporting: (exporting) => set({ isExporting: exporting }),

  setTemplate: (templateId) => 
    set((state) => {
      const template = masterTemplates.find(t => t.id === templateId) || state.activeTemplate;
      return { activeTemplate: template };
    }),

  updateTypography: (updates) =>
    set((state) => ({
      activeTemplate: {
        ...state.activeTemplate,
        typography: { ...state.activeTemplate.typography, ...updates }
      }
    })),

  updateColors: (updates) =>
    set((state) => ({
      activeTemplate: {
        ...state.activeTemplate,
        colors: { ...state.activeTemplate.colors, ...updates }
      }
    })),

  updateVisibility: (updates) =>
    set((state) => ({
      activeTemplate: {
        ...state.activeTemplate,
        visibility: { ...state.activeTemplate.visibility, ...updates }
      }
    })),

  setDocumentContent: (content) => set({ documentContent: content })
}));
