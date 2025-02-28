import type { ImageMetadata } from "astro";
import placeholderImage from "@/assets/images/about-us.svg";

// Import client images with a more reliable relative path pattern
// This will include all client images in the build
const clientImages = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/clients/*.{png,jpg,jpeg,svg,PNG}",
  { eager: true }
);

// Import all other images for general usage
const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/**/*.{jpeg,jpg,png,gif,svg,PNG}",
  { eager: true }
);

/**
 * Gets an image by its CMS path
 * @param path - The CMS image path (e.g. /images/example.svg)
 * @returns The imported image with metadata, or a placeholder if not found
 */
export const getImageFromPath = (path: string): ImageMetadata => {
  if (!path) {
    return placeholderImage;
  }

  // Handle client images from CMS paths (e.g. /images/clients/logo.png)
  if (path.startsWith("/images/clients/")) {
    const fileName = path.split("/").pop();

    // Search for the image by filename (case insensitive)
    const clientImageKey = Object.keys(clientImages).find(key =>
      key.toLowerCase().endsWith(`/${fileName?.toLowerCase()}`)
    );

    if (clientImageKey && clientImages[clientImageKey]) {
      return clientImages[clientImageKey].default;
    }
  }

  // Handle other images by filename
  const imgFileName = path.split("/").pop();
  if (imgFileName) {
    // Try to find the image in allImages by filename
    const imageKey = Object.keys(allImages).find(key =>
      key.toLowerCase().includes(imgFileName.toLowerCase())
    );

    if (imageKey && allImages[imageKey]) {
      return allImages[imageKey].default;
    }
  }

  // If image not found, return placeholder and log warning
  console.warn(`Image not found: ${path}`);
  return placeholderImage;
};
