import { Award, Download, Share2 } from 'lucide-react'
import { useCertificates } from '@/features/dashboard/hooks'

export function CertificatesSection() {
  const { data: certificates } = useCertificates()

  return (
    <section id="certificates">
      <h2 className="font-display text-lg font-semibold">Certificates</h2>

      {certificates.length === 0 ? (
        <div className="mt-4 rounded-lg border border-dashed border-appBorder p-8 text-center">
          <Award className="h-6 w-6 text-appMuted mx-auto" />
          <p className="mt-2 text-sm text-appMuted">
            Complete a course to earn your first certificate.
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="rounded-lg border border-appBorder bg-appSurface p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="rounded-md bg-teal/10 p-2.5 shrink-0">
                <Award className="h-5 w-5 text-teal" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{cert.courseTitle}</h3>
                <p className="mt-1 text-xs text-appMuted">
                  Issued {cert.issuedDate} · {cert.certificateNumber}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 rounded-md border border-appBorder px-3 py-1.5 text-xs hover:border-teal transition-colors">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                <button className="flex items-center gap-1.5 rounded-md border border-appBorder px-3 py-1.5 text-xs hover:border-teal transition-colors">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
