export type BaseEntity = {
  id: string;
  createdAt: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

type BaseTweet = Entity<{
  content: string;
  userId: string;
  parentId?: string;
  user: {
    username: string;
  };
}>;
export type Tweet = Entity<{
  content: string;
  userId: string;
  parentId?: string;
  user: {
    username: string;
  };
  createdAt: string;
  replies: BaseTweet[];
  Like: string[];
  isLiked: boolean;
  _count: {
    replies: number;
    Like: number;
  };
}>;

export type User = Entity<{
  email: string;
  username: string;
}>;

export type AuthResponse = {
  user: User;
  sessionId: string;
};
