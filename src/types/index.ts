export interface Mystery {
  id: string;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
  tags: string[];
  source?: string;
  finalThought: string;
}