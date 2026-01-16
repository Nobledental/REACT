import React from 'react';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/data/treatments';
import TreatmentDetailClient from '@/components/TreatmentDetailClient';

// This function tells GitHub Pages which pages to build
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
  return <TreatmentDetailClient treatment={treatment} />;
}
