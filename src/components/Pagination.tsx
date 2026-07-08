import { FIRST_PAGE } from '../constants';

type Props = {
  page: number;
  totalPages: number;
  disabled: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, disabled, onPageChange }: Props) {
  return (
    <div className="pagination">
      <button
        type="button"
        className="btn"
        disabled={disabled || page <= FIRST_PAGE}
        onClick={() => onPageChange(page - 1)}
      >
        ‹ Prev
      </button>
      <span className="pagination__label">
        Page #{page} / {totalPages}
      </span>
      <button
        type="button"
        className="btn"
        disabled={disabled || page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next ›
      </button>
    </div>
  );
}
