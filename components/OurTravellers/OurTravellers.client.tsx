"use client";

import TravellersList from "../TravellersList/TravellersList";
import css from "./OurTravellers.module.css";
import { Traveler } from "@/types/traveller";

type OurTravellersClientProps = {
  travelers: Traveler[];
};

export default function OurTravellersClient({
  travelers,
}: OurTravellersClientProps) {
  return (
    <section className={css.ourTravelersSection}>
      <h2 className={css.travellersHeader}>Наші Мандрівники</h2>
      <TravellersList travelers={travelers} limit={4} showViewAllButton />
    </section>
  );
}
