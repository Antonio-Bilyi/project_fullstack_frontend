import { Traveler } from "@/types/traveller";
import { User } from "@/types/user";
import Image from "next/image";
import css from "./TravellerInfo.module.css";

interface TravellerInfoProps {
  traveller?: Traveler;
  user?: User;
}

export default function TravellerInfo({ traveller, user }: TravellerInfoProps) {
  const data = traveller || user;

  if (!data) {
    return null;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.imageWrapper}>
        <Image
          src={data.avatarUrl || "/avatar/defaultAvatar.webp"}
          alt={data.name}
          width={120}
          height={120}
          className={css.avatar}
          unoptimized
        />
      </div>
      <div className={css.info}>
        <h1 className={css.name}>{data.name}</h1>
        {data.description && <p className={css.description}>{data.description}</p>}
      </div>
    </div>
  );
}
