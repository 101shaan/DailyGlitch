export interface Database {
  public: {
    Tables: {
      mysteries: {
        Row: {
          id: string;
          title: string;
          date: string;
          content: string;
          imageUrl: string;
          tags: string[];
          source?: string;
          finalThought: string;
          created_at?: string;
        };
        Insert: {
          id: string;
          title: string;
          date: string;
          content: string;
          imageUrl: string;
          tags: string[];
          source?: string;
          finalThought: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          content?: string;
          imageUrl?: string;
          tags?: string[];
          source?: string;
          finalThought?: string;
          created_at?: string;
        };
      };
    };
  };
}