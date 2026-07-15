export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  userId: string;
}

export interface RatingStats {
  label: string;
  value: number;
  percent: number;
}