import React from 'react';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/data/treatments';
import TreatmentDetailClient from '@/components/TreatmentDetailClient';

// This runs at build time on the server
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

  // treatment is now a plain JSON object (no functions/icons)
  return <TreatmentDetailClient treatment={treatment} />;
}
