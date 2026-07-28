import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";

import { urlFor } from "../sanity/lib/image";

type SanityImageValue = {
  asset?: { _ref?: string };
  alt?: string;
};

/**
 * Sanity encodes the source dimensions in the asset ref
 * (`image-<id>-<width>x<height>-<ext>`), which is the only way to give
 * next/image a correct aspect ratio without a second round trip.
 */
function dimensionsFromRef(ref?: string) {
  const match = ref?.match(/-(\d+)x(\d+)-[a-z]+$/);
  if (!match) return { width: 1600, height: 900 };
  return { width: Number(match[1]), height: Number(match[2]) };
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset?._ref) return null;

      const { width, height } = dimensionsFromRef(value.asset._ref);

      return (
        <Image
          src={urlFor(value).width(1600).fit("max").auto("format").url()}
          alt={value.alt ?? ""}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 768px"
          className="rounded-lg"
        />
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
};
