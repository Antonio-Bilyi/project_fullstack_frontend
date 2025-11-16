import { Story } from '@/types/story';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addStoryToFavorites, removeStoryFromFavorites } from '@/lib/api/clientsApi/clientApi';
import { useUserAuthStore } from '@/lib/store/authStore';
import Modal from '@/components/Modal/Modal';
import { truncateText } from '@/lib/utils';
import css from './TravellersStoriesItem.module.css';

interface TravellersStoriesItemProps {
  story: Story;
}

export default function TravellersStoriesItem({ story }: TravellersStoriesItemProps) {
  const router = useRouter();
  const isAuthenticated = useUserAuthStore((state) => state.isAuthenticated);

  const [favoriteCount, setFavoriteCount] = useState(story.favoriteCount);
  const [isFavorited, setIsFavorited] = useState(story.isFavorited || false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const formattedDate = new Date(story.date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handleToggleFavorite = async () => {
    // Проверяем авторизацию
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (isUpdating) return;

    setIsUpdating(true);
    try {
      if (isFavorited) {
        // Удаляем из избранного
        const result = await removeStoryFromFavorites(story._id);
        setFavoriteCount(result.story.favoriteCount);
        setIsFavorited(false);
      } else {
        // Добавляем в избранное
        const result = await addStoryToFavorites(story._id);
        setFavoriteCount(result.story.favoriteCount);
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className={css.card}>
        <div className={css.imageWrapper}>
          {story.img && (
            <Image
              src={story.img}
              alt="111111"
              width={400}
              height={300}
              className={css.image}
              decoding="async"
              loading="lazy"
            />
          )}
        </div>

        <div className={css.content}>
          <p className={css.category}>{story.category.name}</p>

          <h3 className={css.title}>{story.title}</h3>

          <p className={css.description}>{truncateText(story.article)}</p>

          <div className={css.authorInfo}>
            <Image
              src={story.ownerId.avatar || '/avatar-placeholder.png'}
              alt={story.ownerId.name}
              width={40}
              height={40}
              className={css.avatar}
            />
            <div className={css.authorDetails}>
              <p className={css.authorName}>{story.ownerId.name}</p>
              <div className={css.metaInfo}>
                <span className={css.date}>{formattedDate}</span>
                <span className={css.views}>
                  • {favoriteCount}{' '}
                  <svg width="16" height="16" className={css.viewsIcon}>
                    <use href="/svg-sprite.svg#icon-bookmark"></use>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className={css.buttonWrapper}>
            <Link href={`/stories/${story._id}`} className={css.readButton}>
              Переглянути статтю
            </Link>
            <button
              className={`${css.bookmarkButton} ${isFavorited ? css.favorited : ''}`}
              aria-label={isFavorited ? "Видалити з закладок" : "Додати до закладок"}
              onClick={handleToggleFavorite}
              disabled={isUpdating}
            >
              <svg className={css.bookmarkIcon} width="20" height="20">
                <use href="/svg-sprite.svg#icon-bookmark"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Потрібна авторизація"
        message="Щоб додати історію до закладок, потрібно увійти в систему або зареєструватися."
        buttons={[
          {
            label: 'Увійти',
            onClick: () => {
              setShowAuthModal(false);
              router.push('/auth/login');
            },
            variant: 'primary',
          },
          {
            label: 'Зареєструватися',
            onClick: () => {
              setShowAuthModal(false);
              router.push('/auth/register');
            },
            variant: 'secondary',
          },
        ]}
      />
    </>
  );
}