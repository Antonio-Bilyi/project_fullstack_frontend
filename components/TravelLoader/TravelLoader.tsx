'use client';

import css from './TravelLoader.module.css';

const TravelLoader = () => {
  return (
    <div className={css.planeloader}>
      <div className={css.plane}>✈️</div>
      <div className={css.trail}></div>
      <p className={css.planetext}>Завантажується...</p>
    </div>
  );
};

export default TravelLoader;
