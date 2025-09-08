import httpClient from "@/lib/axios";

export async function addCustomerApi(data: { name: string; phone: string }) {
  const response = await httpClient.post("/api/customers/add", data);
  return response.data;
}
