import React from 'react'
import {useNavigate} from "react-router-dom";

const Header: React.FC = (props) => {
    const navigate = useNavigate()
    return <div>
            <button onClick={() => navigate('/coins/:page=1')}>click</button>
    </div>
}

export default Header