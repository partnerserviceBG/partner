const GEO_CACHE_KEY = 'house-geocode-cache-v1';

type CachedGeometry = number[];
type GeocodeCacheMap = Record<string, CachedGeometry>;

const readCache = (): GeocodeCacheMap => {
  const raw = localStorage.getItem(GEO_CACHE_KEY);
  if (!raw) {
    return {};
  }
  try {
    return JSON.parse(raw) as GeocodeCacheMap;
  } catch {
    localStorage.removeItem(GEO_CACHE_KEY);
    return {};
  }
};

const writeCache = (cache: GeocodeCacheMap) => {
  localStorage.setItem(GEO_CACHE_KEY, JSON.stringify(cache));
};

export const getCachedGeometry = (address: string): CachedGeometry | null => {
  const cache = readCache();
  return cache[address] || null;
};

export const setCachedGeometry = (address: string, geometry: CachedGeometry) => {
  const cache = readCache();
  cache[address] = geometry;
  writeCache(cache);
};
