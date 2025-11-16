import { Story } from '@/types/story';
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem';
import css from './TravellersStories.module.css';

interface TravellersStoriesProps {
  stories: Story[];
}

export default function TravellersStories({ stories }: TravellersStoriesProps) {
  return (
    <div className={css.storiesGrid}>
      {stories.map((story) => (
        <TravellersStoriesItem key={story._id} story={story} />
      ))}
    </div>
  );
}