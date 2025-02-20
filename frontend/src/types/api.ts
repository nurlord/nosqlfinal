export type BaseEntity = {
  id: string;
  createdAt: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type Tweet = Entity<{
  content: string;
  userId: string;
  parentId?: string;
  user: {
    username: string;
  };
  createdAt: string;
}>;

export type User = Entity<{
  email: string;
  username: string;
}>;

export type AuthResponse = {
  user: User;
  sessionId: string;
};
