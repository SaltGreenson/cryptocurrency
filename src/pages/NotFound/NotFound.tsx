import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound: React.FC = (props) => {
  const navigate = useNavigate();
  const [redirectTime, setRedirectTime] = useState<number>(10);

  setInterval(() => {
    setRedirectTime(redirectTime - 1);
  }, 1000);

  useEffect(() => {
    if (redirectTime <= 0) {
      navigate('/coins/:page=1', { replace: true });
    }
  }, [redirectTime]);

  return (
    <div className={classes.container}>
      <p className={classes.title}>404 NOT FOUND</p>
      <p>
        <Link data-testid="mainPageLink" to="/coins/:page=1" className={classes.link}>
          Redirecting after...
        </Link>
        {redirectTime}
      </p>
    </div>
  );
};

export default NotFound;
