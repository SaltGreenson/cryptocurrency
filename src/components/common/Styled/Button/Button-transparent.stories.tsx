import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Button from './Button';
import '/src/App.module.css';

export default {
  title: 'Button/Transparent',
  component: Button.Transparent,
  argTypes: {
    color: {
      type: 'string',
      description: 'Sets the font color',
      defaultValue: 'yellow',
      options: ['yellow', 'blue'],
      control: {
        type: 'radio',
      },
    },
    children: {
      type: 'string',
      defaultValue: 'Click',
      description: 'Sets the text inside the button',
    },
    onClickTransmittedValues: {
      type: Object,
      description: 'Values that transmitted to onClick',
    },
  },
} as ComponentMeta<typeof Button.Transparent>;

const TemplateTransparentBtn: ComponentStory<typeof Button.Transparent> = (args) => <Button.Transparent {...args} />;

export const Transparent = TemplateTransparentBtn.bind({});
Transparent.args = {
  children: '★',
  color: 'yellow',
};
