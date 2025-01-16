"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const PasswordPagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange("page", currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <PaginationItem key={pageIndex}>
            <PaginationLink
              onClick={() => handlePageChange("page", pageIndex + 1)}
            >
              {pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange("page", currentPage + 1)}
            aria-disabled={totalPages === currentPage}
            className={
              totalPages === currentPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
