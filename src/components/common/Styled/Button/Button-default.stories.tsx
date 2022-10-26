import Button from './Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '/src/App.module.css';
import { func } from 'prop-types';
import React from 'react';

export default {
  title: 'Button/Default',
  component: Button,
  argTypes: {
    bgColor: {
      type: 'string',
      defaultValue: 'default',
      description: 'Sets the background color of the button',
      options: ['default', 'red', 'green'],
      control: {
        type: 'radio',
      },
    },
    children: {
      type: 'string',
      defaultValue: 'Click',
      description: 'Sets the text inside the button',
    },
    onClick: {
      type: func,
      description: 'onClick handler inside the button',
    },
    onClickTransmittedValues: {
      type: Object,
      description: 'Values that transmitted to onClick',
    },
  },
} as ComponentMeta<typeof Button>;

const TemplateDefaultBtn: ComponentStory<typeof Button> = (args) => <Button {...args} />;
export const Default = TemplateDefaultBtn.bind({});
Default.args = {
  children: 'Click',
  bgColor: 'default',
};
