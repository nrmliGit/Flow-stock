import { OrderStatus } from "./enums";
import { GetProductItem, ProductItem } from "./product.types";

export type GetOrder = {
  id: number;
  customerName: string;
  status: OrderStatus;
  getProductItems: Array<GetProductItem>;
};

export type AddOrder = {
  customerId: number;
  productItems: Array<ProductItem>;
};
