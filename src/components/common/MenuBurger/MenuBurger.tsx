import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './MenuBurger.module.css';

export type ElementMenuBurgerType = {
    elementTitle: string,
    elementLink: string,
}

type PropsType = {
    elements: Array<ElementMenuBurgerType>,
    children: React.FC | React.DetailedHTMLProps<any, any>
}

const MenuBurger: React.FC<PropsType> = ({ elements, children }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChangeCheckBox = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  return (
    <div className={classes.burgerMenu}>
      <input
        id="menuToggle"
        className={classes.menuToggle}
        type="checkbox"
        onChange={() => handleChangeCheckBox()}
        checked={isChecked}
      />
      <label className={classes.menuBtn} htmlFor="menuToggle" data-cy="burgerMenu">
        <span />
      </label>

      <ul className={classes.menubox}>
        {children}

        {elements.map((element) => (
          <li key={element.elementTitle}>
            <Link onClick={() => handleChangeCheckBox()} className={classes.menuItem} to={element.elementLink}>
              {element.elementTitle}
            </Link>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default MenuBurger;
