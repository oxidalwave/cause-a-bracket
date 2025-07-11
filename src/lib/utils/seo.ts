export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "bluesky:title", content: title },
    { name: "bluesky:description", content: description },
    { name: "bluesky:creator", content: "@oxidalwave" },
    { name: "bluesky:site", content: "@oxidalwave" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...(image
      ? [
          { name: "bluesky:image", content: image },
          { name: "bluesky:card", content: "summary_large_image" },
          { name: "og:image", content: image },
        ]
      : []),
  ];

  return tags;
};
