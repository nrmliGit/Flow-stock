import { Dispatch, SetStateAction } from "react";

export default function AddOrderButton({
  openModal,
}: {
  openModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <button
        onClick={() => openModal(true)}
        className="bg-blue-500 text-white py-2 px-3 rounded-md"
      >
        + Add Order
      </button>
    </>
  );
}
