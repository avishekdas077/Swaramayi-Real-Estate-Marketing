import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Swarnamayi Real Estate Marketing - Your Dream Property. Our Trusted Guidance.',
  description = 'Premier Real Estate Marketing Company in Kolkata. Find residential flats, apartments, sky villas, plots & commercial property in New Town, Rajarhat, Salt Lake & South Kolkata.',
  keywords = 'Swarnamayi Real Estate Marketing, Kolkata real estate, flats for sale in Kolkata, properties in New Town, Rajarhat real estate, luxury apartments Kolkata',
  canonical = '',
  schema = null,
}) {
  const currentUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="SWARNAMAYI REAL ESTATE MARKETING" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Schema.org */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
}
