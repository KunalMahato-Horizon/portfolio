import { Helmet } from "react-helmet";

export default function SEO({
  title,
  description,
  path = "",
  image = "/og-image.png",
}) {
  const siteUrl = "https://yourdomain.com";
  const url = `${siteUrl}${path}`;

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <link
        rel="canonical"
        href={url}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:image"
        content={`${siteUrl}${image}`}
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:image:alt"
        content="Kunal Mahato - Frontend Developer"
      />

      <meta
        property="og:site_name"
        content="Kunal Mahato"
      />

      {/* Twitter / X */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={`${siteUrl}${image}`}
      />

      <meta
        name="twitter:image:alt"
        content="Kunal Mahato - Frontend Developer"
      />
    </Helmet>
  );
}