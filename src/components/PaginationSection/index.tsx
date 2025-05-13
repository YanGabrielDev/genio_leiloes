import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { PaginationSectionProps } from "@/interfaces/components/paginationSection.interface";

const getPaginationItems = (totalPages: number, currentPage: number, delta: number = 1): (number | string)[] => {
  let range: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }
  let rangeWithDots: (number | string)[] = [];
  let l = 0;
  range.forEach((item) => {
    if (item - l > 2) {
      rangeWithDots.push('...');
    }
    if (item - l === 2) {
      rangeWithDots.push(item - 1);
    }
    rangeWithDots.push(item);
    l = item;
  });
  return rangeWithDots;
};

export function PaginationSection({ totalItems, handleChangePage, page }: PaginationSectionProps) {
  const pages = Math.floor(totalItems / 24);
  const previousPage = page - 1;
  const nextPage = page + 1;
  const showPreviousPage = page !== 1;
  const showNextPages = page < pages;
  const paginationItems = getPaginationItems(pages, page);

  return (
    <Pagination>
      <PaginationContent>
        {showPreviousPage && (
          <PaginationItem onClick={() => handleChangePage(previousPage)}>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}
        {paginationItems.map((item, index) => {
          if (item === '...') {
            return <PaginationItem key={index} ><span className="text-gray-500">...</span></PaginationItem>;
          } else {
            return (
              <PaginationItem key={index} onClick={() => handleChangePage(Number(item))}>
                <PaginationLink href="#" isActive={item === page}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}
        {showNextPages && (
          <PaginationItem onClick={() => handleChangePage(nextPage)}>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}