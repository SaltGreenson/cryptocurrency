import React from 'react';
import preloader from '../../../assets/images/preloader.gif';
import classes from './Preloader.module.css';

const Preloader: React.FC = () => (
  <div className={classes.preloader}>
    <img className={classes.preloaderImg} src={preloader} alt="" />
  </div>
);

export default Preloader;
