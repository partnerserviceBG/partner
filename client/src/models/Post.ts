export interface Post {
  id: string | number;
  title: string;
  content?: string;
  image?: string;
  userId?: string;
  housesId?: string[];
  updatedAt?: string,
  createdAt?: string,
}
