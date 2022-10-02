import Button from './Button'
import {ComponentMeta, ComponentStory} from "@storybook/react";
import '/src/App.module.css'

export default {
    title: 'Button/Transparent',
    component: Button.Transparent,
    argTypes: {
        color: {
            type: 'string',
            description: 'Sets the fonts color',
            defaultValue: 'yellow',
            options: ['yellow', 'blue'],
            control: {
                type: 'radio'
            }
        }
    }
} as ComponentMeta<typeof Button.Transparent>

const TemplateTransparentBtn: ComponentStory<typeof Button.Transparent> = (args) => <Button.Transparent {...args}/>


export const Transparent = TemplateTransparentBtn.bind({})
Transparent.args = {
    children: '★',
    color: 'yellow'
}



