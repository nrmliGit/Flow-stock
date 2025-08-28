import { GetCustomer } from "./customer.types";
import { OrderStatus } from "./enums";
import { GetProductItem, ProductItem } from "./product.types";

export type GetOrder = {
  id: number;
  customer: GetCustomer;
  status: OrderStatus;
  getProductItems: Array<GetProductItem>;
};

export type AddOrder = {
  customerId: number;
  productItems: Array<ProductItem>;
};

export type OrderProductType = {
  id: number;
  unit: number;
  price: number;
  quantity: number;
};
