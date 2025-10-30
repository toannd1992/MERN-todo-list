import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskPagination = ({
  page,
  setPage,
  totalPages,
  handleNext,
  handlePrev,
}) => {
  const viewPages = () => {
    const pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }
    return pages;
  };

  const dataPage = viewPages();

  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrev}
            className={cn(
              "cursor-pointer",
              page === 1 && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
        {/* number */}
        {dataPage.map((i, index) => (
          <PaginationItem key={index}>
            {i === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={i === page}
                onClick={() => {
                  if (i != page) setPage(i);
                }}
                className="cursor-pointer"
              >
                {i}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            className={cn(
              "cursor-pointer",
              page === totalPages && "pointer-events-none opacity-50"
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TaskPagination;
