/**
 * Converts CMS image paths to asset paths
 * @param path - The CMS image path (e.g. /images/example.svg)
 * @returns The image path for use in the Image component
 */
export const getImageFromPath = (path: string): string => {
  // For imported images (using import.meta.glob), we want to use relative paths
  // This ensures they'll work in both dev and production
  return path.startsWith("/images/")
    ? `../assets${path}` // Convert /images/example.jpg to ../assets/images/example.jpg
    : path; // Leave other paths unchanged
};
