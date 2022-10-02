import Button from './Button'
import {ComponentMeta, ComponentStory} from "@storybook/react";
import '/src/App.module.css'

export default {
    title: 'Button/Default',
    component: Button,
} as ComponentMeta<typeof Button>

const TemplateDefaultBtn: ComponentStory<typeof Button> = (args) => <Button {...args}/>
export const Default = TemplateDefaultBtn.bind({});
Default.args = {
    children: 'Click',
    bgColor: 'default'
}



