import React from 'react';
import styled, {css} from "styled-components";

type PropsType = {
    children: React.FC | React.DetailedHTMLProps<any, any>
    childStickyPosition?: number
}

const TableStyled = styled.table<PropsType>`
  width: 100%;
  border-collapse: collapse;
  white-space: normal;


  
`

const Table: React.FC<PropsType> = (props) => {
    return <TableStyled {...props}/>
};

export default Table;