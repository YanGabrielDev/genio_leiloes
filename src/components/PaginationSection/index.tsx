import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationSectionProps } from "@/interfaces/components/paginationSection.interface";

export function PaginationSection({
  totalItems,
  handleChangePage,
  page,
}: PaginationSectionProps) {
  const pages = Math.floor(totalItems / 24).toFixed();
  const previousPage = page - 1;
  const nextPage = page + 1;
  const showNextPages = Number(pages) !== page
  const showPreviousPage = page !== 1
{console.log(pages, page);
}
  return (
    <Pagination>
      <PaginationContent>
        {showPreviousPage &&
          <PaginationItem onClick={() => handleChangePage(previousPage)}>
            <PaginationPrevious href="#" />
          </PaginationItem>

        }
        {Array.from({ length: Number(pages) }).map((_, index) => {
          const currentpage = index + 1;
          const isActivePage = currentpage === page;

          return (
            <PaginationItem
              key={index}
              onClick={() => handleChangePage(currentpage)}
            >
              <PaginationLink href="#" isActive={isActivePage}>
                {currentpage}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {showNextPages && 
        <PaginationItem onClick={() => handleChangePage(nextPage)}>
          <PaginationNext href="#" />
        </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  );
}
