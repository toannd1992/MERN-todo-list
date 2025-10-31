import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const Filters = ({ completeCount = 0, activeCount = 0, filter, setFilter }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* thong ke */}
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {activeCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-info/20 bg-sky-100"
        >
          {completeCount} {FilterType.completed}
        </Badge>
      </div>
      {/* bo loc */}
      <div className="flex gap-1 flex-row">
        {Object.keys(FilterType).map((item) => (
          <Button
            key={item}
            variant={filter === item ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setFilter(item);
            }}
          >
            <Filter />
            {FilterType[item]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
