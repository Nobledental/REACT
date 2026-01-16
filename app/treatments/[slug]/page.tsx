// app/treatments/[slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/data/treatments';
import TreatmentDetailClient from '@/components/TreatmentDetailClient';

// This function tells GitHub Pages which pages to build
// It runs at BUILD time on the server
export function generateStaticParams() {
  return Object.keys(treatmentsData).map((slug) => ({
    slug: slug,
  }));
}

export default function TreatmentDetail({ params }: { params: { slug: string } }) {
  const treatment = treatmentsData[params.slug];

  if (!treatment) {
    return notFound();
  }

  // Pass data to the Client Component
  // 'treatment' object now contains ONLY strings, numbers, arrays (no functions)
  return <TreatmentDetailClient treatment={treatment} />;
}
