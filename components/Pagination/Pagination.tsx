import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className={css.pagination}>
      <button
        className={css.button}
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Попередня
      </button>

      <span className={css.pageInfo}>
        Сторінка {currentPage} з {totalPages}
      </span>

      <button
        className={css.button}
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Наступна
      </button>
    </div>
  );
}