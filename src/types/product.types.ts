import { ProductUnit } from "./enums";

export type Product = {
  id: number;
  size: string;
  thumbnail: string;
  price: number;
  productModelId: number;
  blockNumber: number;
  pieceNumber: number;
  colorId: number;
  categoryId: number;
  userId: string;
  stock: number;
};

export type ProductJoinStockStringDto = {
  id: number;
  size: string;
  thumbnail: string;
  price: number;
  productModelId: number;
  blockNumber: number;
  pieceNumber: number;
  colorId: number;
  categoryId: number;
  userId: string;
  stock: string;
  created_at: Date;
  updated_at: Date;
  product_model_name: string;
  product_color_name: string;
};

export type ProductJoin = {
  id: number;
  size: string;
  thumbnail: string;
  price: number;
  productModelId: number;
  blockNumber: number;
  pieceNumber: number;
  colorId: number;
  categoryId: number;
  userId: string;
  stock: number;
  created_at: Date;
  updated_at: Date;
  product_model_name: string;
  product_color_name: string;
};

export type ProductItem = {
  id: number;
  quantity: number;
  price: number;
  unit: ProductUnit;
};

export type AddProductDto = {
  size: string;
  thumbnail: string;
  price: number;
  productModelId: number;
  blockNumber: number;
  pieceNumber: number;
  colorId: number;
  stock: number;
};

export type GetProductItem = {
  id: number;
  quantity: number;
  price: number;
  unit: ProductUnit;
  size: string;
  thumbnail: string;
  colorName: string;
  modelName: string;
};
