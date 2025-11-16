'use client';

import { useRouter } from 'next/navigation';
import styles from './MessageNoStories.module.css';

interface MessageNoStoriesProps {
  variant: 'own' | 'saved' | 'other' | 'filtered';
}

const MessageNoStories: React.FC<MessageNoStoriesProps> = ({ variant  }) => {
  const router = useRouter();

  let text = '';
  let buttonText = '';
  let route = '';

  switch (variant) {
    case 'own':
      text = 'Ви ще нічого не публікували, поділіться своєю першою історією!';
      buttonText = 'Опублікувати історію';
      route = '/new-story';
      break;
    case 'saved':
      text = 'У вас ще немає збережених історій, мершій збережіть вашу першу історію!';
      buttonText = 'До історій';
      route = '/stories';
      break;
    case 'other':
      text = 'Цей користувач ще не публікував історій';
      buttonText = 'Назад до історій';
      route = '/stories';
      break;
    case 'filtered':
      text = 'В цій категорії поки немає історій';
      buttonText = '';
      route = '';
      break;
    default:
      text = 'Немає історій для відображення';
      buttonText = 'Назад';
      route = '/stories';
  }

  const handleClick = () => { 
    router.push(route);
  }

  return (
    <div className={styles.block}>
      <p className={styles.message}>{text}</p>
      {buttonText && (
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
      )}
    </div>
  )
};

export default MessageNoStories;
