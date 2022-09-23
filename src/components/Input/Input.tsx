import React, {ElementRef} from 'react';
import Flex from '../Flex';
import Block from "../Block";
import {theme} from '../../index'
import {StyledInput, StyledNumberInput} from './styles/Input-styles';
import Paragraph from "../Paragraph";


type PropsTypes = {
    placeholder?: string
    name?: string
    value: string
    setValue: (value: string) => void
}

type InputsTypes = {
    Number: React.FC<PropsNumberTypes>
}

type PropsNumberTypes = {
    value: number
    increment: () => void
    decrement: () => void
    setValue: (value: number) => void
    name?: string
}


export const Input: React.FC<PropsTypes> & InputsTypes = (props) => {
    return <StyledInput {...props}/>
};


Input.Number = ({value, setValue, increment, decrement, ...props}) => {

    return <Flex>
        <Block needBgColorHover
               bgColorHover={theme.colors.red}
               userSelect={'none'}
               width={'25px'}
               height={'25px'}
               cursor={'pointer'}
               borderRadius={'10px 0 0 10px'}>

            <Paragraph fontSize={'25px'} align={'center'} justify={'center'}>
                -
            </Paragraph>

        </Block>

        <StyledNumberInput {...props}
                           onChange={() => setValue(value)}
                           value={value}
                           pattern="^[0-9]+(.[0-9]+)?$"
                           required/>


        <Block needBgColorHover
               bgColorHover={theme.colors.green}
               userSelect={'none'}
               width={'25px'}
               height={'25px'}
               cursor={'pointer'}
               borderRadius={'0 10px 10px 0'}>

            <Paragraph fontSize={'25px'} align={'center'} justify={'center'}>
                +
            </Paragraph>

        </Block>


    </Flex>
}