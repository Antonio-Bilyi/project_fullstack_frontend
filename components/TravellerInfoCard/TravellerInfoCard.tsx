import Link from "next/link";
import Image from "next/image";
import css from "./TravellerInfoCard.module.css";
import { Traveler } from "@/types/traveller";

export default function TravellerInfoCard({
  _id,
  name,
  description,
  avatarUrl,
}: Traveler) {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={avatarUrl ? avatarUrl : "/avatar/defaultAvatar.webp"}
          alt={name}
          className={css.avatar}
          width={112}
          height={112}
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className={css.content}>
        <h3 className={css.name}>{name}</h3>
        <p className={css.description}>{description}</p>
        <Link href={`/travellers/${_id}`} className={css.profileButton}>
          Переглянути профіль
        </Link>
      </div>
    </div>
  );
}
