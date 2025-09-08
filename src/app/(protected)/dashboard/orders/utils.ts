import httpClient from "@/lib/axios";

// export function addOrder(formEvent: FormEvent<HTMLFormElement>) {
//   formEvent.preventDefault();
//   const formData = new FormData(formEvent.currentTarget);

//   const response = httpClient
//     .post("/api/orders/add", {
//       customerId: formData.get("customerId"),
//       productItems: [
//         {
//           id: Number(formData.get("id")),
//           unit: Number(formData.get("unit")),
//           quantity: Number(formData.get("quantity")),
//           price: parseFloat(formData.get("price")?.toString() ?? ""),
//         },
//       ],
//     })
//     .then((res) => {
//       if (res.status === 201) toast.success("Order added Successfully");
//     })
//     .catch((e) => {
//       if (axios.isAxiosError(e)) toast.error(e.response?.data);
//       else {
//         //  toast.error("Something went wrong");
//         console.error("Unknown Error:", e);
//       }
//     });

//   return "ok";
// }

export async function completeOrder(id: number) {
  const res = await httpClient.patch(`/api/orders/${id}/complete`);
  return res.data;
}
