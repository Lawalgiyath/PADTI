"use client";

import Link from "next/link";

export function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 font-body text-xs leading-relaxed text-muted-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-0.5 h-4 w-4 shrink-0 rounded-none border-border accent-primary"
      />
      <span>
        I agree to the{" "}
        <Link href="/terms-of-service" target="_blank" className="font-bold text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" target="_blank" className="font-bold text-primary hover:underline">
          Privacy Policy
        </Link>
        , and I consent to PADTI processing my personal data, including any National Identification Number I
        provide, for identity verification and service delivery purposes in accordance with the Nigeria Data
        Protection Act 2023.
      </span>
    </label>
  );
}
