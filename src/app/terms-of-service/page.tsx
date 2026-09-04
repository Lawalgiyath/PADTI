import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionLabel } from "@/components/section-label";

export const metadata = {
  title: "Terms of Service | PADTI",
  description: "The terms governing use of the PADTI Connect platform.",
};

export default function TermsOfServicePage() {
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
        <h1 className="mb-2 font-headline text-4xl text-ink">Terms of Service</h1>
        <p className="mb-12 font-body text-sm text-muted-foreground">Last updated: September 2026</p>

        <div className="space-y-10 font-body text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">1. Acceptance of terms</h2>
            <p>
              By creating an account or using the PADTI Connect platform, you agree to these Terms of Service and
              our <Link href="/privacy-policy" className="font-bold text-primary hover:underline">Privacy Policy</Link>.
              These terms are governed by the laws of the Federal Republic of Nigeria.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">2. Eligibility and accounts</h2>
            <p>
              You must provide accurate information when registering. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity under your account. PADTI reserves
              the right to suspend accounts found to contain fraudulent information, including falsified
              identification documents.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">3. Course enrollment and payment</h2>
            <p>
              Course fees are displayed in Nigerian Naira (₦) and processed through our licensed payment
              processor, Paystack. By enrolling, you authorize the applicable charge or installment plan.
              Installment plans require timely payment to maintain active enrollment status; PADTI will notify
              you before any suspension of access due to missed payment.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">4. Refunds and cancellation</h2>
            <p>
              Refund eligibility depends on how much of a program has been delivered at the time of cancellation.
              Contact PADTI support to request a cancellation; refunds, where applicable, are processed back to
              the original payment method within a reasonable period.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">5. Identity verification</h2>
            <p>
              Certain features, including certificate issuance and the verified talent marketplace, require
              identity verification. You consent to PADTI reviewing the National Identification Number and
              supporting documentation you submit for this purpose. Providing false identification information
              is a violation of these terms and may be reported to the relevant authorities.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">6. Marketplace conduct</h2>
            <p>
              Employers, drivers, and other partners using the Marketplace agree to represent listings,
              applications, and credentials honestly. PADTI does not guarantee employment outcomes and is not a
              party to any employment agreement formed between users.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">7. Intellectual property</h2>
            <p>
              Course materials, curricula, and platform content are the property of PADTI or its licensors and
              may not be reproduced or redistributed without written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">8. Limitation of liability</h2>
            <p>
              PADTI provides the platform on an &quot;as is&quot; basis and is not liable for indirect or
              consequential losses arising from your use of the platform, to the fullest extent permitted by
              Nigerian law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">9. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the platform after changes take
              effect constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-headline text-xl text-ink">10. Contact</h2>
            <p>Questions about these terms can be directed to PADTI through the support channel in your dashboard.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
