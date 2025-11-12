import Link from "next/link";
import Image from "next/image";
import css from "./TravellerInfoCard.module.css";

type TravellerInfoCardProps = {
  id: string;
  name: string;
  description: string;
  avatarUrl: string;
};

export default function TravellerInfoCard({
  id,
  name,
  description,
  avatarUrl,
}: TravellerInfoCardProps) {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={avatarUrl}
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
        <Link href={`/travellers/${id}`} className={css.profileButton}>
          Переглянути профіль
        </Link>
      </div>
    </div>
  );
}
