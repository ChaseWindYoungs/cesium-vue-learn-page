export const getAssetsFile = (url: any) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};