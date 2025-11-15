import Link from "next/link";
import TravellerInfoCard from "../TravellerInfoCard/TravellerInfoCard";
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
  showViewAllButton?: boolean;
};

export default function TravellersList({
  travelers,
  limit,
  showViewAllButton,
}: TravellersListProps) {
  const displayedTravelers = limit ? travelers.slice(0, limit) : travelers;
  return (
    <div className={css.wrapper}>
      <ul className={css.cardsWrapper}>
        {displayedTravelers.map((traveler) => (
          <li key={traveler.id} className={css.cardItem}>
            <TravellerInfoCard {...traveler} />
          </li>
        ))}
      </ul>

      {showViewAllButton && (
        <div className={css.buttonWrapper}>
          <button className={css.viewAllButton}>
            <Link href="/travellers">Переглянути всіх</Link>
          </button>
        </div>
      )}
    </div>
  );
}
