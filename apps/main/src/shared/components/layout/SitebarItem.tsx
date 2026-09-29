import { Link, useLocation } from 'react-router';

import { Group, Text } from '@mantine/core';

export interface SitebarItemProperties {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function SitebarItem({ label, href, icon }: Readonly<SitebarItemProperties>) {
  const { pathname } = useLocation();
  const isActive = href === pathname;

  return (
    <Link className={`sitebar-item${isActive ? ' is-active' : ''}`} to={href}>
      <Group gap="0.75rem" wrap="nowrap">
        <Text className="sitebar-item-icon" component="span">
          {icon}
        </Text>
        <Text className="sitebar-item-text" component="span">
          {label}
        </Text>
      </Group>
    </Link>
  );
}
