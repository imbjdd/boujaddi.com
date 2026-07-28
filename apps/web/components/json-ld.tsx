/**
 * Escapes `<` before the payload reaches the DOM. Article titles come from
 * Sanity, so a title containing "</script>" would otherwise close the tag
 * early and put author-controlled text into the document as markup.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
