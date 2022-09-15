import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import classes from './Header.module.css'

const Header: React.FC = React.memo((props) => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate('/coins/:page=1')
    }

    return <div className={classes.container}>
        <div className={classes.titleWrap}>
            <Link className={classes.title} to="/coins/:page=1">CØOINCAP</Link>
        </div>
    </div>
})

export default Header