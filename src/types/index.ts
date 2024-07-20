export interface Category {
    _id: any;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface Post {
    _id: any;
    title: string;
    content: string;
    author: string;
    category: Category | string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}