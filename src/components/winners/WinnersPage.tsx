import { useEffect } from 'react';
import { WINNERS_PAGE_SIZE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { winnersPageChanged } from '../../store/winners/winnersSlice';
import { fetchWinners } from '../../store/winners/winnersThunks';
import { getTotalPages } from '../../utils/helpers';
import Pagination from '../Pagination';
import WinnersTable from './WinnersTable';

export default function WinnersPage() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.winners.page);
  const sort = useAppSelector((state) => state.winners.sort);
  const order = useAppSelector((state) => state.winners.order);
  const totalCount = useAppSelector((state) => state.winners.totalCount);

  useEffect(() => {
    dispatch(fetchWinners({ page, sort, order }));
  }, [dispatch, page, sort, order]);

  return (
    <section className="winners">
      <h2 className="view-title">Winners ({totalCount})</h2>
      <WinnersTable />
      <Pagination
        page={page}
        totalPages={getTotalPages(totalCount, WINNERS_PAGE_SIZE)}
        disabled={false}
        onPageChange={(newPage) => dispatch(winnersPageChanged(newPage))}
      />
    </section>
  );
}
