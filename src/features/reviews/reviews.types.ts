// The API does not return reviews, so the page shows example ones in this shape
export type Review = {
  id: string;
  rating: number; // 1 to 5
  title: string;
  text?: string;
  date: string; // ISO date
  author: string;
  likes: number;
  hasMedia: boolean; // has a photo or a video
  topics: string[];
};
