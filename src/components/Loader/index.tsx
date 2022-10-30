import React from "react";

function Loader() {
  return (
    <>
      <tr className="h-screen flex justify-center items-center absolute left-0 right-0 top-0">
        <div className="px-4 py-12">
          <div className=" rounded relative">
            <div className="rounded-full bg-indigo-200 w-[160px] h-[160px] relative flex justify-center items-center mx-auto animate-spin">
              <svg
                className="absolute top-4 right-6"
                width={22}
                height={22}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={10} cy={10} r={10} fill="#4338CA" />
              </svg>
              <div className="div rounded-full bg-slate-50 w-[120px] h-[120px]" />
            </div>
            <p className="mt-6 text-base font-medium text-gray-800 text-center">
              Loading date...
            </p>
          </div>
        </div>
      </tr>
    </>
  );
}

export default Loader;
