import { Traveler } from "@/types/traveller";
import Image from "next/image";
import css from "./TravellerInfo.module.css";

interface TravellerInfoProps {
  traveller: Traveler;
}

export default function TravellerInfo({ traveller }: TravellerInfoProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.imageWrapper}>
        <Image
          src={traveller.avatarUrl || "/avatar/defaultAvatar.webp"}
          alt={traveller.name}
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      <div className={css.info}>
        <h1 className={css.name}>{traveller.name}</h1>
        {traveller.description && (
          <p className={css.description}>{traveller.description}</p>
        )}
      </div>
    </div>
  );
}
