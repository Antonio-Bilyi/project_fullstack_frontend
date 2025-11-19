import Container from "../Container/Container";
import Section from "../Section/Section";
import { getAllTravelers } from "@/lib/api/clientsApi/getAllTravelers";
import OurTravellersClient from "./OurTravellers.client";

export default async function OurTravellers() {
  const travelers = await getAllTravelers();

  return (
    <Section>
      <Container>
        <OurTravellersClient travelers={travelers} />
      </Container>
    </Section>
  );
}
