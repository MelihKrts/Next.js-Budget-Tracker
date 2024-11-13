"use client";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";

export default function ExpenseDeleteButton({ id }) {
  const router = useRouter();

  const deleteExpense = async () => {
    const confirmed = confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/expense/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Item deleted successfully", {
            position: "top-right",
            theme: "colored",
            autoClose: 3000,
            closeOnClick: true,
            transition: Slide,
          });

          setTimeout(() => {
            router.refresh();
          }, 3050);
        } else {
          throw new Error("Failed to delete the item");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the item", {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
          closeOnClick: true,
          transition: Slide,
        });
      }
    }
  };

  return (
    <>
      <button
        className="bg-[#C82333] px-4 py-2 text-white rounded-md"
        type="button"
        onClick={deleteExpense}
      >
        Delete
      </button>
    </>
  );
}
