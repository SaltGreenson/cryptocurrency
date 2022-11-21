import React from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import classes from './PopUp.module.css';

type PropsTypes = {
    active: boolean,
    setActive: (set: boolean) => void,
    children: React.FC | React.DetailedHTMLProps<any, any>
}

const PopUp: React.FC<PropsTypes> = ({ active, setActive, children }) => createPortal(
  <div
    data-testid="popUpTestId"
    className={active
      ? classNames(classes.popUp, classes.active)
      : classes.popUp}
    onClick={() => setActive(false)}
    data-cy="popUpBackground"
  >

    <div
      className={active
        ? classNames(classes.popUpContent, classes.active)
        : classes.popUpContent}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>,
  document.body,
);

export default PopUp;
