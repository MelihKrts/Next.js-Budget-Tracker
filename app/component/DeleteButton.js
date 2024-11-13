"use client";
import { useRouter } from "next/navigation";
import { Slide, toast } from "react-toastify";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const deleteIncome = async () => {
    const confirmed = confirm("Are you sure you want to delete?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/income/${id}`, {
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
          }, 3000);
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
    <button
      className="bg-[#C82333] px-4 py-2 text-white rounded-md"
      type="button"
      onClick={deleteIncome}
    >
      Delete
    </button>
  );
}
