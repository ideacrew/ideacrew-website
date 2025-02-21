/**
 * Converts CMS image paths to asset paths
 * @param path - The CMS image path (e.g. /images/example.svg)
 * @returns The asset path (e.g. /src/assets/images/example.svg)
 */
export const getImageFromPath = (path: string): string => {
  return path.replace("/images/", "/src/assets/images/");
};
