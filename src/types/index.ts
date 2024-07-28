export interface Category {
    _id: any;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface SelectedCategory {
    _id: any;
    sessionId: string;
    categoryId: string;
    category: Category;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface Session {
    sessionId: string;
    username: string;
    isGuest: boolean;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    ipAddress: string;
  }

export interface Post {
    _id: any;
    title: string;
    content: string;
    category: Category;
    session: Session;
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
export interface CreatePostDto {
    title: string;
    content: string;
    sessionId: string;
    categoryId: string;
    expiresAt?: string; // ISO string format for dates
  }