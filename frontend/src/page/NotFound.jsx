import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <img
        src="404_NotFound.png"
        alt="Not Found"
        className="max-w-full mb-6 w-96"
      />

      <p className="text-xl font-semibold"> Trang không tồn tại</p>

      <a
        href="/"
        className="inline-block px-6 py-3 mt-6 text-white bg-primary hover:bg-primary-dark transition"
      >
        {" "}
        Về Trang Chủ
      </a>
    </div>
  );
};

export default NotFound;
