import * as React from 'react'

import { Pill, type PillProps } from '@mantine/core'

import classes from './Tag.module.css'

export interface ITagProps extends PillProps {
  content: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'primary' | 'error'
  removable?: boolean
  className?: string
  filled?: boolean
  onRemove?: () => void
}

export function Tag({ content, className, removable = false, variant = 'default', size = 'md', filled = false, ...rest }: ITagProps) {
  const styleRoot = `tag-${variant}`
  const styleFilled = `tag-${filled ? 'filled' : 'empty'}`

  return (
    <Pill
      className={`${classes['mantine-Pill-root']} ${classes[styleRoot]} ${classes[styleFilled]}`}
      size={size}
      withRemoveButton={removable}
      {...rest}
    >
      {content}
    </Pill>
  )
}
