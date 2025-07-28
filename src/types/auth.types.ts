export const UserRole = {
  Customer: 0,
  Seller: 1,
  Moderator: 2,
  Admin: 10,
  SuperAdmin: 100,
} as const;

export type RegisterResult = {
  status: "ok" | "fail" | "";
  message?: string;
};
