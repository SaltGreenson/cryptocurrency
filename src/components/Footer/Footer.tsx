import React from 'react'
import classes from './Footer.module.css'

const Footer: React.FC = (props) => {
    return <div className={classes.footer}>
        <div className={classes.centerPosition}>
            <p className={classes.text}>© 2022 CoinMarketCap. All rights reserved</p>
        </div>
    </div>
}

export default Footer