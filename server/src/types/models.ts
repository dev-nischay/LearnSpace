// import { Types } from 'mongoose';
// import type { Document, FlattenMaps } from 'mongoose';

// // Helper type for ObjectId in lean documents
// type MongoId = Types.ObjectId | string;

// // Base interfaces (without Document inheritance)
// interface UserBase {
//   username: string;
//   password: string;
// }

// interface CourseBase {
//   title: string;
//   description: string;
//   price: string;
//   isPublished: boolean;
//   createdBy: MongoId;
// }

// interface PurchaseBase {
//   courseId: MongoId;
//   userId: MongoId;
//   creatorId: MongoId;
// }

// // Document interfaces (for model instances)
// export interface IUser extends UserBase, Document {}
// export interface ICourse extends CourseBase, Document {}
// export interface IPurchase extends PurchaseBase, Document {}

// // Lean document types
// export type LeanDocument<T> = FlattenMaps<T>;

// export type LeanUser = LeanDocument<UserBase & { _id: MongoId }>;
// export type LeanCourse = LeanDocument<CourseBase & { _id: MongoId }>;
// export type LeanPurchase = LeanDocument<PurchaseBase & { _id: MongoId }>;

// // Request body types
// export interface IUserAuthRequest {
//   username: string;
//   password: string;
// }

// // Extended Express Request types
