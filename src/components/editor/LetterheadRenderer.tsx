"use client"

import { useEditorStore } from "@/store/editorStore"
import { RichTextEditor } from "@/components/editor/RichTextEditor"
import { Building2 } from "lucide-react"

import { LetterheadSchema, CompanyProfileData } from "@/types/template"

interface PureLetterheadProps {
  activeTemplate: LetterheadSchema;
  companyProfile: CompanyProfileData;
  isEditor?: boolean;
  isDocxExport?: boolean;
}

// =====================================
// DOCUMENT HEADER COMPONENT
// =====================================
export function DocumentHeader({ activeTemplate, companyProfile, isDocxExport = false }: PureLetterheadProps) {
  const { layout, visibility, colors } = activeTemplate
  
  const LogoElement = () => {
    if (!visibility.showLogo) return null;
    if (companyProfile.logoUrl) {
      return <img src={companyProfile.logoUrl} alt="Company Logo" className="max-h-16 object-contain" />
    }
    return (
      <div className="flex items-center gap-2 text-[var(--primary-color)]" style={{ color: isDocxExport ? colors.primary : undefined }}>
        <Building2 className="h-8 w-8" />
        <span className="font-bold tracking-tight text-xl">{companyProfile.companyName}</span>
      </div>
    )
  }

  // If exporting to DOCX, we MUST use tables for left/right alignment, because MS Word 
  // does not support HTML flexbox in headers
  if (isDocxExport) {
    switch (layout) {
      case "corporate":
      case "modern":
        return (
          <table style={{ width: "100%", borderBottom: `2px solid ${colors.secondary}`, marginBottom: "20px" }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", width: "50%" }}>
                  {visibility.showLogo && !companyProfile.logoUrl && <h2 style={{ color: colors.primary, margin: 0 }}>{companyProfile.companyName}</h2>}
                  {visibility.showLogo && companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Logo" style={{ maxHeight: "60px" }} />}
                </td>
                <td style={{ verticalAlign: "top", textAlign: "right", width: "50%", color: colors.text, fontSize: "10pt" }}>
                  {visibility.showCompanyName && !companyProfile.logoUrl && <div style={{ fontWeight: "bold", fontSize: "12pt", marginBottom: "4px" }}>{companyProfile.companyName}</div>}
                  {visibility.showAddress && <div>{companyProfile.addressLine1}</div>}
                  {visibility.showAddress && companyProfile.city && <div>{companyProfile.city}, {companyProfile.country}</div>}
                  {visibility.showPhone && <div>{companyProfile.phone}</div>}
                </td>
              </tr>
            </tbody>
          </table>
        )
      case "executive":
        return (
          <div style={{ textAlign: "center", borderBottom: `2px solid ${colors.primary}`, paddingBottom: "20px", marginBottom: "20px" }}>
            {visibility.showLogo && !companyProfile.logoUrl && <h2 style={{ color: colors.primary, margin: 0 }}>{companyProfile.companyName}</h2>}
            {visibility.showLogo && companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Logo" style={{ maxHeight: "60px", margin: "0 auto" }} />}
            {visibility.showCompanyName && <h1 style={{ color: colors.primary, fontSize: "16pt", textTransform: "uppercase", marginTop: "10px", marginBottom: "5px" }}>{companyProfile.companyName}</h1>}
            <div style={{ color: colors.secondary, fontSize: "10pt" }}>
              {visibility.showAddress && <span>{companyProfile.addressLine1}, {companyProfile.city}</span>}
              {visibility.showPhone && <span> &bull; {companyProfile.phone}</span>}
            </div>
          </div>
        )
      case "structural":
        return (
          <table style={{ width: "100%", backgroundColor: colors.primary, color: "#ffffff", padding: "20px", marginBottom: "20px" }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "middle", width: "50%" }}>
                  {visibility.showLogo && !companyProfile.logoUrl && <h2 style={{ color: "#ffffff", margin: 0 }}>{companyProfile.companyName}</h2>}
                  {visibility.showLogo && companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Logo" style={{ maxHeight: "50px" }} />}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "right", width: "50%", color: "#ffffff", fontSize: "10pt" }}>
                  {visibility.showEmail && <div>{companyProfile.email}</div>}
                  {visibility.showPhone && <div>{companyProfile.phone}</div>}
                </td>
              </tr>
            </tbody>
          </table>
        )
      case "minimalist":
      default:
        return (
          <div style={{ marginBottom: "20px" }}>
            {visibility.showLogo && !companyProfile.logoUrl && <h2 style={{ color: colors.primary, margin: 0 }}>{companyProfile.companyName}</h2>}
            {visibility.showLogo && companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Logo" style={{ maxHeight: "60px" }} />}
          </div>
        )
    }
  }

  // STANDARD HTML RENDERER (Web / PDF)
  switch (layout) {
    case "corporate":
      return (
        <div className="flex items-start justify-between border-b border-[var(--secondary-color)] pb-6 mb-[var(--header-bottom-margin)]">
          <div className="flex flex-col">
            <LogoElement />
          </div>
          <div className="text-right text-[var(--text-color)] text-sm">
            {visibility.showCompanyName && !companyProfile.logoUrl && <h1 className="font-bold text-lg mb-1">{companyProfile.companyName}</h1>}
            <div className="text-[var(--secondary-color)] space-y-0.5">
              {visibility.showAddress && <p>{companyProfile.addressLine1}</p>}
              {visibility.showAddress && companyProfile.city && <p>{companyProfile.city}, {companyProfile.country}</p>}
              {visibility.showPhone && <p>{companyProfile.phone}</p>}
            </div>
          </div>
        </div>
      )
    case "executive":
      return (
        <div className="flex flex-col items-center text-center pb-8 border-b-2 border-[var(--primary-color)] mb-[var(--header-bottom-margin)]">
          <LogoElement />
          {visibility.showCompanyName && <h1 className="mt-4 font-serif font-bold text-2xl tracking-widest uppercase text-[var(--primary-color)]">{companyProfile.companyName}</h1>}
          <div className="mt-2 text-sm text-[var(--secondary-color)] flex items-center justify-center gap-4">
            {visibility.showAddress && <span>{companyProfile.addressLine1}, {companyProfile.city}</span>}
            {visibility.showPhone && <span>• {companyProfile.phone}</span>}
          </div>
        </div>
      )
    case "structural":
      return (
        <div className="bg-[var(--primary-color)] text-white p-8 -mx-[var(--page-margin)] -mt-[var(--page-margin)] mb-[var(--header-bottom-margin)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {visibility.showLogo && !companyProfile.logoUrl && <Building2 className="h-10 w-10 text-white" />}
            {visibility.showLogo && companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Logo" className="max-h-12 brightness-0 invert" />}
            {visibility.showCompanyName && <h1 className="text-3xl font-bold tracking-tight">{companyProfile.companyName}</h1>}
          </div>
          <div className="text-right text-white/80 text-sm space-y-1">
            {visibility.showEmail && <p>{companyProfile.email}</p>}
            {visibility.showPhone && <p>{companyProfile.phone}</p>}
          </div>
        </div>
      )
    case "minimalist":
      return (
        <div className="pb-4 mb-[var(--header-bottom-margin)]">
          <LogoElement />
        </div>
      )
    case "modern":
      return (
        <div className="flex items-start justify-between pb-8 mb-[var(--header-bottom-margin)]">
          <div className="bg-[var(--primary-color)] p-6 -mt-[var(--page-margin)] -ml-[var(--page-margin)] text-white rounded-br-3xl inline-block">
            {visibility.showLogo && !companyProfile.logoUrl && <Building2 className="h-8 w-8 text-white mb-2" />}
            {visibility.showLogo && companyProfile.logoUrl && <img src={companyProfile.logoUrl} alt="Logo" className="max-h-10 brightness-0 invert mb-2" />}
            {visibility.showCompanyName && <h1 className="font-bold text-lg">{companyProfile.companyName}</h1>}
          </div>
          <div className="text-right pt-6 text-sm text-[var(--secondary-color)]">
            {visibility.showAddress && <p>{companyProfile.addressLine1}</p>}
            {visibility.showPhone && <p>{companyProfile.phone}</p>}
          </div>
        </div>
      )
    default:
      return null;
  }
}

// =====================================
// DOCUMENT FOOTER COMPONENT
// =====================================
export function DocumentFooter({ activeTemplate, companyProfile, isDocxExport = false }: PureLetterheadProps) {
  const { layout, visibility, colors } = activeTemplate

  if (isDocxExport) {
    switch (layout) {
      case "executive":
        return (
          <div style={{ textAlign: "center", borderTop: `1px solid ${colors.secondary}`, paddingTop: "15px", color: colors.secondary, fontSize: "9pt" }}>
            <p style={{ margin: "0 0 4px 0" }}>{companyProfile.addressLine1}, {companyProfile.city}, {companyProfile.postalCode} | {companyProfile.country}</p>
            <p style={{ margin: "0 0 4px 0" }}>T: {companyProfile.phone} | E: {companyProfile.email} | W: {companyProfile.website}</p>
            {visibility.showRegistration && <p style={{ margin: 0, fontSize: "8pt" }}>Reg: {companyProfile.registrationNumber}</p>}
          </div>
        )
      case "minimalist":
        return (
          <table style={{ width: "100%", color: colors.secondary, fontSize: "9pt", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", width: "70%" }}>
                  {visibility.showAddress && <span>{companyProfile.addressLine1}, {companyProfile.city} &nbsp;&nbsp; </span>}
                  {visibility.showEmail && <span>{companyProfile.email}</span>}
                </td>
                <td style={{ verticalAlign: "top", textAlign: "right", width: "30%" }}>
                  {visibility.showWebsite && <span>{companyProfile.website}</span>}
                </td>
              </tr>
            </tbody>
          </table>
        )
      case "structural":
        return (
          <table style={{ width: "100%", backgroundColor: "#f1f5f9", padding: "15px", color: colors.text, fontSize: "9pt", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "middle", width: "50%", fontWeight: "bold" }}>
                  {companyProfile.companyName}
                </td>
                <td style={{ verticalAlign: "middle", textAlign: "right", width: "50%" }}>
                  {visibility.showAddress && <span>{companyProfile.addressLine1} &nbsp;&nbsp; </span>}
                  {visibility.showPhone && <span>{companyProfile.phone}</span>}
                </td>
              </tr>
            </tbody>
          </table>
        )
      case "modern":
      case "corporate":
      default:
        return (
          <table style={{ width: "100%", color: colors.secondary, fontSize: "9pt", marginTop: "20px" }}>
            <tbody>
              <tr>
                <td style={{ verticalAlign: "top", width: "50%" }}>
                  {visibility.showCompanyName && <div style={{ fontWeight: "bold", color: colors.primary, marginBottom: "4px" }}>{companyProfile.companyName}</div>}
                  {visibility.showRegistration && <div style={{ fontSize: "8pt" }}>Registration: {companyProfile.registrationNumber}</div>}
                  {visibility.showTaxPin && <div style={{ fontSize: "8pt" }}>Tax PIN: {companyProfile.taxPin}</div>}
                </td>
                <td style={{ verticalAlign: "top", textAlign: "right", width: "50%" }}>
                  {visibility.showAddress && <div>{companyProfile.addressLine1}, {companyProfile.city}</div>}
                  {visibility.showWebsite && <div>{companyProfile.website}</div>}
                </td>
              </tr>
            </tbody>
          </table>
        )
    }
  }

  // STANDARD HTML RENDERER (Web / PDF)
  switch (layout) {
    case "executive":
      return (
        <div className="mt-auto pt-6 border-t border-[var(--secondary-color)]/30 text-center text-[var(--footer-size)] text-[var(--secondary-color)]">
          <p>{companyProfile.addressLine1}, {companyProfile.city}, {companyProfile.postalCode} | {companyProfile.country}</p>
          <p className="mt-1">T: {companyProfile.phone} | E: {companyProfile.email} | W: {companyProfile.website}</p>
          {visibility.showRegistration && <p className="mt-1 text-xs opacity-70">Reg: {companyProfile.registrationNumber}</p>}
        </div>
      )
    case "minimalist":
      return (
        <div className="mt-auto pt-4 flex items-center justify-between text-[var(--footer-size)] text-[var(--secondary-color)]">
          <div className="flex gap-4">
            {visibility.showAddress && <span>{companyProfile.addressLine1}, {companyProfile.city}</span>}
            {visibility.showEmail && <span>{companyProfile.email}</span>}
          </div>
          <div>
            {visibility.showWebsite && <span>{companyProfile.website}</span>}
          </div>
        </div>
      )
    case "structural":
      return (
        <div className="mt-auto -mx-[var(--page-margin)] -mb-[var(--page-margin)] bg-[var(--secondary-color)]/10 p-6 flex items-center justify-between text-[var(--footer-size)] text-[var(--text-color)]">
          <div className="font-bold">{companyProfile.companyName}</div>
          <div className="flex gap-6">
            {visibility.showAddress && <span>{companyProfile.addressLine1}</span>}
            {visibility.showPhone && <span>{companyProfile.phone}</span>}
          </div>
        </div>
      )
    case "modern":
    case "corporate":
    default:
      return (
        <div className="mt-auto pt-4 flex items-start justify-between text-[var(--footer-size)] text-[var(--secondary-color)]">
          <div>
            {visibility.showCompanyName && <p className="font-bold text-[var(--primary-color)]">{companyProfile.companyName}</p>}
            {visibility.showRegistration && <p className="text-xs mt-1">Registration: {companyProfile.registrationNumber}</p>}
            {visibility.showTaxPin && <p className="text-xs">Tax PIN: {companyProfile.taxPin}</p>}
          </div>
          <div className="text-right">
            {visibility.showAddress && <p>{companyProfile.addressLine1}, {companyProfile.city}</p>}
            {visibility.showWebsite && <p>{companyProfile.website}</p>}
          </div>
        </div>
      )
  }
}

// =====================================
// MAIN LETTERHEAD RENDERER
// =====================================
export function PureLetterheadRenderer({ activeTemplate, companyProfile, isEditor = false, isDocxExport = false }: PureLetterheadProps) {
  const { layout, typography, colors, margins, visibility } = activeTemplate

  // CSS Variable injection for dynamic theming
  const dynamicStyles = {
    "--primary-color": colors.primary,
    "--secondary-color": colors.secondary,
    "--text-color": colors.text,
    "--font-family": typography.fontFamily,
    "--heading-size": typography.headingSize,
    "--body-size": typography.bodySize,
    "--footer-size": typography.footerSize,
    "--page-margin": margins.page,
    "--header-bottom-margin": margins.headerBottom,
  } as React.CSSProperties

  // Common Header Components based on layout type
  const renderHeader = () => <DocumentHeader activeTemplate={activeTemplate} companyProfile={companyProfile} isDocxExport={isDocxExport} />
  const renderFooter = () => <DocumentFooter activeTemplate={activeTemplate} companyProfile={companyProfile} isDocxExport={isDocxExport} />

  return (
    <div 
      className="bg-white shadow-2xl flex flex-col mx-auto overflow-hidden relative print:shadow-none"
      style={{
        ...dynamicStyles,
        width: "210mm",
        height: "297mm", // A4
        minHeight: "297mm",
        maxHeight: "297mm",
        padding: "var(--page-margin)",
        fontFamily: "var(--font-family)",
        color: "var(--text-color)",
        fontSize: "var(--body-size)"
      }}
    >
      {/* Dynamic Header */}
      {renderHeader()}

      {/* Document Body Area */}
      <div 
        className="flex-1 overflow-hidden relative" 
        style={{
          lineHeight: "1.6",
        }}
      >
        {isEditor ? (
          <RichTextEditor />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: "<p><strong>To Whom It May Concern,</strong></p><p>We are writing to officially confirm...</p>" }} />
        )}
      </div>

      {/* Dynamic Footer */}
      {renderFooter()}
    </div>
  )
}

export function LetterheadRenderer() {
  const { activeTemplate, companyProfile } = useEditorStore()
  return <PureLetterheadRenderer activeTemplate={activeTemplate} companyProfile={companyProfile} isEditor={true} />
}
