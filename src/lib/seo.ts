import { Metadata } from "next";

export const siteConfig = {
    name: "Werbebildschirme.ch",
    description: "Digital Signage Schweiz ohne Abo-Kosten. Werbebildschirme & Infoscreens mit lokalem Betrieb und Live-Daten Integration. Einmalige Investition, schweizweite Installation.",
    url: "https://werbebildschirme.ch",
    ogImage: "https://werbebildschirme.ch/og.jpg",
    links: {
        twitter: "https://twitter.com/infraone",
        github: "https://github.com/infraone",
    },
};

export function constructMetadata({
    title = siteConfig.name,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@infraone",
        },
        icons,
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "InfraOne IT Solutions GmbH",
        "url": "https://werbebildschirme.ch",
        "logo": "https://werbebildschirme.ch/infraone-logo-schwarz.svg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+41-52-222-18-18",
            "contactType": "customer service",
            "areaServed": "CH",
            "availableLanguage": "German"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rudolf-Diesel-Strasse 25",
            "addressLocality": "Winterthur",
            "postalCode": "8404",
            "addressCountry": "CH"
        }
    };
}
