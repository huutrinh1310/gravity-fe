import { type Meta, type StoryObj } from '@storybook/react-vite'

import { Tag as TagComponent } from './Tag'

export default {
  title: 'Tag/Tag',
  args: {
    content: 'Sample Tag',
    removable: false,
    size: 'md',
    variant: 'default',
    filled: false
  },
  component: TagComponent,
} as Meta<typeof TagComponent>

export const Default: StoryObj<typeof TagComponent> = {}

export const EmptyState: StoryObj<typeof TagComponent> = {
  args: {
    content: 'Empty State Tag',
    size: 'sm',
  },
}

export const PrimaryVariant: StoryObj<typeof TagComponent> = {
  args: {
    content: 'Primary Tag',
    variant: 'primary',
  },
}

export const ErrorVariant: StoryObj<typeof TagComponent> = {
  args: {
    content: 'Error Tag',
    variant: 'error',
  },
}

export const FilledTag: StoryObj<typeof TagComponent> = {
  args: {
    content: 'Filled Tag',
    filled: true,
  },
}