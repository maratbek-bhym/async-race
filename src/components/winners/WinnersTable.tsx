import { FIRST_PAGE, WINNERS_PAGE_SIZE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { sortToggled } from '../../store/winners/winnersSlice';
import type { SortField, WinnerRow } from '../../types';
import CarSvg from '../garage/CarSvg';
import SortHeader from './SortHeader';

function WinnersTableRow({ row, number }: { row: WinnerRow; number: number }) {
  return (
    <tr>
      <td>{number}</td>
      <td>
        <CarSvg color={row.car.color} />
      </td>
      <td>{row.car.name}</td>
      <td>{row.wins}</td>
      <td>{row.time}</td>
    </tr>
  );
}

export default function WinnersTable() {
  const dispatch = useAppDispatch();
  const { rows, page, sort, order, isLoading, loadError } = useAppSelector(
    (state) => state.winners,
  );

  if (loadError) {
    return <p className="notice notice--error">{loadError}</p>;
  }
  if (!isLoading && rows.length === 0) {
    return <p className="notice">No winners yet — go to the garage and start a race! 🏁</p>;
  }

  const offset = (page - FIRST_PAGE) * WINNERS_PAGE_SIZE;
  const handleSort = (field: SortField): void => {
    dispatch(sortToggled(field));
  };

  return (
    <div className="table-wrap">
      <table className="winners-table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Car</th>
            <th scope="col">Name</th>
            <SortHeader label="Wins" field="wins" sort={sort} order={order} onSort={handleSort} />
            <SortHeader
              label="Best time (s)"
              field="time"
              sort={sort}
              order={order}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <WinnersTableRow key={row.id} row={row} number={offset + index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
