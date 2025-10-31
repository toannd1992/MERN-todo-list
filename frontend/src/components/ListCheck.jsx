import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/api";
import { toast } from "sonner";

const ListCheck = ({ item, render }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateTask, setUpdateTask] = useState(item.title || "");
  const [isStatus, setIsStatus] = useState(false);

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      render();
      toast.success("Xóa nhiệm vụ thành công");
    } catch (error) {
      console.log("delete", error);
      toast.error("Xóa nhiệm vụ thất bại");
    }
  };

  const handleEditTask = async (key, id) => {
    setIsEdit(true);

    if (key === "Enter") {
      try {
        await api.put(`/tasks/${id}`, { title: updateTask });
        render();
        toast.success("Update nhiệm vụ thành công");
        setIsEdit(false);
      } catch (error) {
        console.log("delete", error);
        toast.error("Xóa nhiệm vụ thất bại");
        setIsEdit(false);
      }
    }
  };

  const handleComplete = async (item, id) => {
    setIsStatus(!isStatus);

    try {
      // await api.put(`/tasks/${id}`, {
      //   status: isStatus ? "active" : "complete",
      //   completedAt: !isStatus ? new Date().toISOString() : "",
      // });
      // render();
      // toast.success("Nhiệm vụ đã hoàn thành");
      if (item.status === "active") {
        await api.put(`/tasks/${id}`, {
          status: "complete",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${item.title} đã hoàn thành`);
      } else {
        await api.put(`/tasks/${id}`, {
          status: "active",
          completedAt: "",
        });
        toast.success(`${item.title} chưa hoàn thành`);
      }
      render();
    } catch (error) {
      console.log("complete", error);
      toast.error("Xảy ra lỗi vui lòng thử lại sau 3 giây");
    }
  };
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        item.status === "complete" && "opacity-75"
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            item.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
          onClick={() => handleComplete(item, item._id)}
        >
          {item.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-4" />
          )}
        </Button>
        {/* tieu de */}
        <div className="flex-1 min-w-0">
          {isEdit ? (
            <Input
              placeholder="Phải làm gì"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              autoFocus
              value={updateTask}
              onChange={(e) => setUpdateTask(e.target.value)}
              onKeyPress={(e) => {
                handleEditTask(e.key, item._id);
              }}
              onBlur={() => {
                setIsEdit(false);
                setUpdateTask(item.title || "");
              }}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                item.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              )}
            >
              {item.title}
            </p>
          )}
          {/* ngay */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(item.createdAt).toLocaleString()}
            </span>
            {item.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(item.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* chinh sua va xoa */}
        <div className="block sm:hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              // handleEditTask(item._id);
              setIsEdit(true);
            }}
          >
            <SquarePen />
          </Button>
          {/* delete */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              handleDeleteTask(item._id);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ListCheck;
