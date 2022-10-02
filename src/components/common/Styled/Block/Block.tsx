import React from 'react';
import {BlockFlexStyles, FlexPropsTypes} from "./block-styles";

type BlockPropsTypes = {
    children: React.FC | React.DetailedHTMLProps<any, any>
}

type BlockTypes = {
    Flex: React.FC<BlockPropsTypes & FlexPropsTypes>
}

const Block:React.FC<BlockPropsTypes & FlexPropsTypes> & BlockTypes = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

Block.Flex = ({...rest}) => {
    return <BlockFlexStyles {...rest} />
}

export default Block;