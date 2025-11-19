import css from "./Pagination.module.css";

interface PaginationProps {
  name: string;
  onClick: () => void;
}

export default function Pagination({ name, onClick }: PaginationProps) {
  return (
    <button className={css.btnLoadMore} onClick={onClick}>
      {name}
    </button>
  );
}
