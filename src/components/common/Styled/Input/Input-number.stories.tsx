import React from 'react';
import { func } from 'prop-types';
import Input from './Input';
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
  title: 'Input/Number',
  component: Input.Number,
  argTypes: {
    decrement: {
      type: func,
      description: 'Reduces the value inside the input',
    },
    increment: {
      type: func,
      description: 'Increases the value inside the input',
    },
    name: {
      type: 'string',
      description: 'Sets the name of the input',
    },
    placeholder: {
      type: 'string',
      description: 'Sets the placeholder of the input',
    },
  },
} as ComponentMeta<typeof Input.Number>;

const Template: ComponentStory<typeof Input.Number> = (args) => <Input.Number {...args} />;

export const Number = Template.bind({});
Number.args = {
  decrement: () => {},
  increment: () => {},
  name: 'input',
  placeholder: 'input',
};
