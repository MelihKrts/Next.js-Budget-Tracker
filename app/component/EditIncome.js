import Link from "next/link";
import DeleteButton from "@/app/component/DeleteButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default async function EditIncome() {
  console.log(
    "API URL:",
    `${process.env.NEXT_PUBLIC_API_URL?.trim()}/api/income`,
  );
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL?.trim()}/api/income`,
  );

  let response = await data.json();

  return (
    <section className="w-full">
      <h2 className="text-2xl text-center">Edit Income</h2>
      <div className="w-full flex flex-col items-center">
        {response.incomes.map((item) => (
          <div className="w-full flex justify-center" key={item._id}>
            <div className="w-full flex flex-col lg:flex-row bg-white border border-gray-200 rounded-md p-4 my-4 m-4 ">
              {/* Category Name */}
              <div className="flex lg:w-1/4 flex-col lg:flex-row items-start lg:items-center">
                <h4 className="text-lg font-semibold mb-1 lg:mb-0 lg:px-4">
                  Category Name:
                </h4>
                <span className="text-md">{item.category}</span>
              </div>

              {/* Amount */}
              <div className="flex lg:w-1/4 flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-0">
                <h4 className="text-lg font-semibold mb-1 lg:mb-0 lg:px-4">
                  Amount:
                </h4>
                <span>{item.amount}</span>
              </div>

              {/* Update Button */}
              <div className="flex lg:w-1/4 items-start lg:items-center mt-4 lg:mt-0">
                <Link href={`/editIncomeForm/${item._id}`}>
                  <button className="rounded-md transition duration-150 ease-in-out bg-yellow-500 hover:bg-yellow-600 px-4 py-2">
                    Update
                  </button>
                </Link>
              </div>

              {/* Delete Button */}
              <div className="flex lg:w-1/4 items-start lg:items-center mt-4 lg:mt-0">
                <DeleteButton id={item._id} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </section>
  );
}
