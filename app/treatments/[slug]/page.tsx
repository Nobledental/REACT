import React from 'react';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/data/treatments';
import TreatmentDetailClient from '@/components/TreatmentDetailClient';

// --- THE FIX IS HERE ---
export function generateStaticParams() {
  // List of IDs that have their own custom folders
  // We exclude them so this generic template doesn't try to build them
  const customPages = ['braces', 'dental-implants', 'root-canal']; 

  return Object.keys(treatmentsData)
    .filter((slug) => !customPages.includes(slug)) // Filter them out!
    .map((slug) => ({
      slug: slug,
    }));
}
// -----------------------

export default function TreatmentDetail({ params }: { params: { slug: string } }) {
  const treatment = treatmentsData[params.slug];

  // If this template is somehow accessed with a custom slug, redirect or 404
  // (Optional extra safety, but generateStaticParams handles the build)
  if (!treatment) {
    return notFound();
  }

  return <TreatmentDetailClient treatment={treatment} />;
}
