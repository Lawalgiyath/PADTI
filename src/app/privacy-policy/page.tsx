import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionLabel } from "@/components/section-label";

export const metadata = {
  title: "Privacy Policy | PADTI",
  description: "How PADTI Connect collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to home
        </Link>

        <SectionLabel>Legal</SectionLabel>
        <h1 className="mb-2 font-headline text-4xl text-ink">Privacy Policy</h1>
        <p className="mb-12 font-body text-sm text-muted-foreground">Last updated: September 2026</p>

        <div className="space-y-10 font-body text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">1. Who we are</h2>
            <p>
              PADTI (Professional Articulated Driver Training Institute) operates the PADTI Connect platform
              (padti.name.ng) and is the data controller for the personal data described in this policy. This
              policy is written to comply with the Nigeria Data Protection Act, 2023 (NDPA) and the Nigeria Data
              Protection Regulation.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">2. Data we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-ink">Identity data:</strong> full name, email address, phone number, state of residence.</li>
              <li><strong className="text-ink">Sensitive personal data:</strong> your National Identification Number (NIN), where you choose to provide it for identity verification. This is treated as sensitive personal data under the NDPA and is processed only with your explicit consent.</li>
              <li><strong className="text-ink">Profile data:</strong> a profile photograph you choose to upload.</li>
              <li><strong className="text-ink">Enrollment and payment data:</strong> course selections, enrollment status, and payment metadata. Card and bank details are collected and processed directly by our payment processor, Paystack — PADTI does not store your card or bank account numbers.</li>
              <li><strong className="text-ink">Organizational data:</strong> for employer and partner accounts, company name, registration number, and sector.</li>
              <li><strong className="text-ink">Usage data:</strong> basic technical information such as login timestamps, generated automatically when you use the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">3. Why we process your data</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>To create and administer your account and deliver driver training services (performance of a contract).</li>
              <li>To verify your identity for certification, employer verification, and fraud prevention (your explicit consent, for NIN specifically).</li>
              <li>To process course payments via Paystack (performance of a contract).</li>
              <li>To comply with FRSC and NATEP regulatory record-keeping obligations (legal obligation).</li>
              <li>To communicate with you about your enrollment, applications, and platform updates (legitimate interest / consent).</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">4. NIN verification</h2>
            <p>
              Where you submit your NIN, it is stored in restricted, access-controlled records readable only by
              you and authorized PADTI administrators. Verification is currently performed through manual
              administrative review against your submitted documentation, not through an automated, real-time
              government database lookup. Your NIN is never displayed in full anywhere in the platform interface
              except to you and to administrators performing verification.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">5. Who we share data with</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-ink">Firebase (Google Cloud):</strong> our infrastructure provider for authentication, database, and file storage.</li>
              <li><strong className="text-ink">Paystack:</strong> our licensed payment service provider, for processing course payments.</li>
              <li><strong className="text-ink">Employer partners:</strong> only where you apply to a job or internship listing, and only the profile information relevant to that application.</li>
              <li><strong className="text-ink">Regulators:</strong> FRSC, NATEP, or other competent Nigerian authorities, where legally required.</li>
            </ul>
            <p className="mt-3">We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">6. Data retention</h2>
            <p>
              We retain your account and training records for as long as your account is active and for a
              reasonable period afterward to meet regulatory, certification, and legal record-keeping
              requirements. You may request deletion at any time, subject to the exceptions in Section 8.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">7. Security</h2>
            <p>
              Your data is stored on access-controlled infrastructure with encryption in transit and at rest.
              Access to sensitive fields such as your NIN is restricted to your own account and authorized
              administrators only.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">8. Your rights</h2>
            <p>Under the NDPA, you have the right to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data, except where we are required to retain it for legal, regulatory, or legitimate record-keeping purposes (for example, completed certification records).</li>
              <li>Withdraw consent for NIN processing at any time — this may limit your access to verified-talent features.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Lodge a complaint with the Nigeria Data Protection Commission (NDPC).</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us using the details in Section 10, or use the data
              request option in your Account Settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">9. Cookies</h2>
            <p>
              We use essential cookies and browser local storage to keep you signed in and remember your
              preferences. We do not use third-party advertising trackers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">10. Contact</h2>
            <p>
              For data protection inquiries or to exercise your rights, contact PADTI through the support
              channel in your dashboard or the contact details published on our homepage.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
