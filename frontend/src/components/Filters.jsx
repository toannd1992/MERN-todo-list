import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

const Filters = ({ completeCount = 0, activeCount = 0, filter, setFilter }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
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
          className="bg-white/50 text-accent-foreground border-info/20 bg-sky-200"
        >
          {completeCount} {FilterType.completed}
        </Badge>
      </div>
      {/* bo loc */}
      <div className="flex flex-col gap-2 sm:flex-row">
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
