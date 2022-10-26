import React from 'react';
import preloader from '../../../assets/images/littlePreloader.gif';
import classes from './LittlePreloader.module.css';

const LittlePreloader: React.FC = () => (
  <div className={classes.preloader}>
    <img className={classes.preloaderImg} src={preloader} alt="" />
  </div>
);

export default LittlePreloader;
