// import TravellerInfoCard from "../TravellerInfoCard/TravellerInfoCard";
import css from "./TravellersList.module.css";

type Traveler = {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
};

type TravellersListProps = {
  travelers: Traveler[];
  limit?: number;
  showPagination?: boolean;
};

export default function TravellersList({
  travelers,
  limit,
  showPagination,
}: TravellersListProps) {
  const displayedTravelers = limit ? travelers.slice(0, limit) : travelers;
  return (
    <div className={css.wrapper}>
      <div className={css.cardsWrapper}>
        {/* {displayedTravelers.map((traveler) => (
          <TravellerInfoCard key={traveler.id} {...traveler} />
        ))} */}
      </div>

      {showPagination && (
        <div className={css.pagination}>
          <button className={css.paginationBtn}>Переглянути всіх</button>
        </div>
      )}
    </div>
  );
}
