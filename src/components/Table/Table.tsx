import React from 'react';
import {TH, TBody, TD, THead, TFoot, StyledTable, TR} from './styles/Table-styles'

type PropsType = {
    children: React.FC | React.DetailedHTMLProps<any, any>,
}

type TableTypes = {
    Head: React.FC<PropsType>
    Body: React.FC<PropsType>
    Foot: React.FC<PropsType>
    TH: React.FC<PropsType>
    TD: React.FC<PropsType>
    TR: React.FC<PropsType>
}

export const Table: React.FC<PropsType> & TableTypes = ({children, ...props}) => {
    return <StyledTable {...props}>
        {children}
    </StyledTable>
};

Table.Head = ({children, ...props}) => {
    return <THead {...props}>
        {children}
    </THead>
};

Table.Body = ({children, ...props}) => {
    return <TBody {...props}>
        {children}
    </TBody>
}

Table.Foot = ({children, ...props}) => {
    return <TFoot {...props}>
        {children}
    </TFoot>
}

Table.TH = ({children, ...props}) => {
    return <TH {...props}>
        {children}
    </TH>
}

Table.TR = ({children, ...props}) => {
    return <TR {...props}>
        {children}
    </TR>
}

Table.TD = ({children, ...props}) => {
    return <TD {...props}>
        {children}
    </TD>
}