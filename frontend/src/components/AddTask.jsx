import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

import { toast } from "sonner";
import api from "@/lib/api";

const AddTask = ({ render }) => {
  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        await api.post("/tasks", { title: newTask });
        toast.success(`Nhiệm vụ ${newTask} đã được thêm thành công`);
        render();
        setNewTask("");
      } catch (error) {
        console.log("addTask", error);
        toast.error(`Thêm nhiệm vụ thất bại`);
      }
    } else {
      toast.error("Bạn cần thêm nhiệm vụ");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <Card className=" p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex items-center justify-center flex-col gap-3 sm:flex-row">
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          onKeyPress={handleEnter}
        />
        <Button className="px-6 " onClick={addTask} disabled={!newTask.trim()}>
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>
  );
};

export default AddTask;
