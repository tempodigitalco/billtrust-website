import { groq } from "next-sanity";

// Homepage
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    title,
    heroHeading,
    heroSubheading,
    heroCtaText,
    heroCtaLink,
    heroImage,
    featuresHeading,
    features[] {
      title,
      description,
      icon
    },
    ctaSection {
      heading,
      description,
      buttonText,
      buttonLink
    }
  }
`;

// All products
export const allProductsQuery = groq`
  *[_type == "product"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    image
  }
`;

// Single product
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    features[] {
      title,
      description
    },
    image,
    ctaText,
    ctaLink
  }
`;

// Product slugs for static generation
export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// All blog posts
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author-> {
      name,
      image
    },
    categories[]-> {
      title,
      slug
    }
  }
`;

// Single blog post
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    publishedAt,
    author-> {
      name,
      image,
      bio
    },
    categories[]-> {
      title,
      slug
    }
  }
`;

// Post slugs for static generation
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Navigation
export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    items[] {
      label,
      href,
      children[] {
        label,
        href
      }
    }
  }
`;
