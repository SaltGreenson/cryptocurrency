import Button from './Button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '/src/App.module.css';
import { func } from 'prop-types';
import React from 'react';

export default {
  title: 'Button/Little',
  component: Button.Little,
  argTypes: {
    bgColorHover: {
      type: 'string',
      description: 'Sets the background color when hovering the cursor',
      defaultValue: 'green',
      options: ['red', 'green'],
      control: {
        type: 'radio',
      },
    },
    children: {
      type: 'string',
      defaultValue: '+',
      description: 'Sets the text inside the button',
    },
    borderRadius: {
      type: 'string',
      description: 'Sets boundaries on the left or right sections',
      defaultValue: '0 10px 10px 0',
      options: ['0 10px 10px 0', '10px 0 0 10px'],
      control: {
        type: 'radio',
      },
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
} as ComponentMeta<typeof Button.Little>;

const TemplateLittleBtn: ComponentStory<typeof Button.Little> = (args) => <Button.Little {...args} />;

export const Little = TemplateLittleBtn.bind({});
Little.args = {
  children: '+',
  bgColorHover: 'green',
  borderRadius: '0 10px 10px 0',
};
