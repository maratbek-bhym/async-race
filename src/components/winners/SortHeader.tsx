import type { SortField, SortOrder } from '../../types';

const SORT_MARKERS: Record<SortOrder, string> = { ASC: '↑', DESC: '↓' };

type Props = {
  label: string;
  field: SortField;
  sort: SortField;
  order: SortOrder;
  onSort: (field: SortField) => void;
};

export default function SortHeader({ label, field, sort, order, onSort }: Props) {
  const marker = sort === field ? SORT_MARKERS[order] : '';

  return (
    <th scope="col">
      <button type="button" className="sort-button" onClick={() => onSort(field)}>
        {label} {marker}
      </button>
    </th>
  );
}
