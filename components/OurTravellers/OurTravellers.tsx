import css from "./OurTravellers.module.css";
import Container from "../Container/Container";
import Section from "../Section/Section";
import TravellersList from "../TravellersList/TravellersList";

type Traveler = {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
};

type OurTravellersProps = {
  travelers: Traveler[];
};

export default function OurTravellers({ travelers }: OurTravellersProps) {
  return (
    <Section>
      <Container>
        <section className={css.ourTravelersSection}>
          <h2 className={css.travellersHeader}>Наші Мандрівники</h2>
          <TravellersList travelers={travelers} limit={4} showViewAllButton />
        </section>
      </Container>
    </Section>
  );
}
