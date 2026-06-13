export default function TermsOfServicePage() {
  return (
    <div className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By viewing or using this website, which can be accessed at dovepeak.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on Dovepeak's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose or for any public display;</li>
            <li>attempt to reverse engineer any software contained on Dovepeak's Website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            All the materials on Dovepeak's Website are provided "as is". Dovepeak makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Dovepeak does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
          </p>

          <h2>4. Limitations</h2>
          <p>
            Dovepeak or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Dovepeak's Website, even if Dovepeak or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
          </p>

          <h2>5. Revisions and Errata</h2>
          <p>
            The materials appearing on Dovepeak's Website may include technical, typographical, or photographic errors. Dovepeak will not promise that any of the materials in this Website are accurate, complete, or current. Dovepeak may change the materials contained on its Website at any time without notice. Dovepeak does not make any commitment to update the materials.
          </p>
        </div>
      </div>
    </div>
  )
}
