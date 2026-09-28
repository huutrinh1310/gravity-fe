import * as React from 'react';

import { Pill, type PillProps } from '@mantine/core';

import classes from './Tag.module.css';

export interface TagProperties extends PillProps {
  content: string;
  filled?: boolean;
  onRemove?: () => void;
  removable?: boolean;
  size?: 'lg' | 'md' | 'sm';
  variant?: 'default' | 'error' | 'primary';
}

export function Tag({ content, filled = false, removable = false, size = 'md', variant = 'default', ...rest }: Readonly<TagProperties>) {
  const styleRoot = `tag-${variant}`;
  const styleFilled = `tag-${filled ? 'filled' : 'empty'}`;

  return (
    <Pill
      className={`${classes['mantine-Pill-root']} ${classes[styleRoot]} ${classes[styleFilled]}`}
      size={size}
      withRemoveButton={removable}
      {...rest}
    >
      {content}
    </Pill>
  );
}
