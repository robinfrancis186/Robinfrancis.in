import { Helmet } from 'react-helmet-async';

type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

interface PageSeoProps {
    title: string;
    description: string;
    canonical: string;
    ogType?: string;
    image?: string;
    robots?: string;
    twitterCard?: string;
    ogTitle?: string;
    ogDescription?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    jsonLd?: JsonLdValue;
}

const DEFAULT_IMAGE = 'https://www.robinfrancis.in/images/og-image.png';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const PageSeo = ({
    title,
    description,
    canonical,
    ogType = 'website',
    image = DEFAULT_IMAGE,
    robots = DEFAULT_ROBOTS,
    twitterCard = 'summary_large_image',
    ogTitle,
    ogDescription,
    twitterTitle,
    twitterDescription,
    jsonLd: _jsonLd,
}: PageSeoProps) => {
    const resolvedOgTitle = ogTitle || title;
    const resolvedOgDescription = ogDescription || description;
    const resolvedTwitterTitle = twitterTitle || title;
    const resolvedTwitterDescription = twitterDescription || description;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={canonical} />

            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={resolvedOgTitle} />
            <meta property="og:description" content={resolvedOgDescription} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={resolvedTwitterTitle} />
            <meta name="twitter:description" content={resolvedTwitterDescription} />
            <meta name="twitter:image" content={image} />

        </Helmet>
    );
};

export default PageSeo;
