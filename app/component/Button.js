export default function Button({ variant, onclick, text, type }) {
  const baseStyles =
    "w-full rounded-md p-2 transition duration-150 hover:ease-in ";
  const variantStyles =
    variant === "save"
      ? "bg-[#28a745] text-white border-[#28a745] hover:bg-[#218838] border-[#1e7e34]"
      : "bg-[#dc3545] border-[#dc3545] text-white";
  return (
    <button
      type={type}
      onClick={onclick}
      className={`${baseStyles} ${variantStyles}`}
    >
      {text}
    </button>
  );
}
