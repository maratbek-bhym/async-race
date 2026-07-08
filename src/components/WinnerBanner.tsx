import { useAppDispatch, useAppSelector } from '../store/hooks';
import { bannerDismissed } from '../store/race/raceSlice';

export default function WinnerBanner() {
  const dispatch = useAppDispatch();
  const winner = useAppSelector((state) => state.race.winner);
  const isWinnerShown = useAppSelector((state) => state.race.isWinnerShown);
  const isNoWinnerShown = useAppSelector((state) => state.race.isNoWinnerShown);

  if (!isWinnerShown && !isNoWinnerShown) {
    return null;
  }

  const message =
    isWinnerShown && winner
      ? `🏆 ${winner.name} wins in ${winner.time}s!`
      : 'No winner — all cars broke down 💥';

  return (
    <div className="winner-banner" role="alert">
      <div className="winner-banner__card">
        <p className="winner-banner__message">{message}</p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => dispatch(bannerDismissed())}
        >
          Close
        </button>
      </div>
    </div>
  );
}
