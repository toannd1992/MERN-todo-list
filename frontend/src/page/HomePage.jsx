import AddTask from "@/components/AddTask";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TaskList from "@/components/TaskList";
import TaskPagination from "@/components/TaskPagination";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import DateTime from "@/components/DateTime";
import { limits } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, settaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [reload, setReload] = useState(false);
  const [date, setDate] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTask();
  }, [reload, date]);

  useEffect(() => {
    setPage(1);
  }, [filter, date]);

  const render = () => setReload(!reload);

  const fetchTask = async () => {
    try {
      // const res = await fetch(api);
      // const data = await res.json();
      // dùng axios
      const res = await api.get(`/tasks?filter=${date}`);
      settaskBuffer(res.data[0].tasks);
      const newActiveCount = res.data[0].activeCount[0]?.count || 0;
      const newCompleteCount = res.data[0].completeCount[0]?.count || 0;
      setActiveCount(newActiveCount);
      setCompleteCount(newCompleteCount);
    } catch (error) {
      console.log("tasks", error);
      toast.error("Tải nhiệm vụ thất bại");
    }
  };

  const filterTask = taskBuffer.filter((item) => {
    switch (filter) {
      case "active":
        return item.status === "active";
      case "completed":
        return item.status === "complete";
      default:
        return true;
    }
  });
  // pagination
  // [1,2,3,4,5,6,7,8,9,10].slice(0,5) => [1,2,3,4,5]
  const visit = filterTask.slice((page - 1) * limits, page * limits);
  const totalPages = Math.ceil(filterTask.length / limits);

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, #fff 40%, #7c3aed 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-2 sm:p-6 mx-auto space-y-6">
          {/* Đầu */}
          <Header />
          {/* Nhiệm vụ */}
          <AddTask render={render} />
          {/* Lọc */}
          <Filters
            activeCount={activeCount}
            completeCount={completeCount}
            filter={filter}
            setFilter={setFilter}
          />
          {/* Danh sách */}
          <TaskList render={render} data={visit} filter={filter} />
          {/* Chân trang */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskPagination
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
            <DateTime className="" date={date} setDate={setDate} />
          </div>

          <Footer activeCount={activeCount} completedCount={completeCount} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
