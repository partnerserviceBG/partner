export interface Post {
  id: string | number;
  title: string;
  content?: string;
  image?: string;
  userId?: string;
  housesId?: (string | number)[] | string | null;
  updatedAt?: string,
  createdAt?: string,
}

export const normalizePostHousesIds = (
  housesId: Post['housesId'],
): string[] => {
  if (Array.isArray(housesId)) {
    return housesId.map((id) => String(id));
  }
  if (typeof housesId === 'string') {
    return housesId
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return [];
};
