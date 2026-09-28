import React from 'react'

import type { TypographyPropertiesInterface } from './Typography.types'

export default function Typography({ variant }: TypographyPropertiesInterface) {
  switch (variant) {
    case 'body1':
    case 'body2':
    case 'overline':
      return <p className={`typography typography--${variant}`} />
    default:
      const Component: React.ElementType = variant || 'p'

      return <Component className={`typography ${variant}`} />
  }
}
