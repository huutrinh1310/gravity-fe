import * as React from 'react';
import type { PortfolioType } from '../../shared/types/ProfileType';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import { Edit } from 'lucide-react';

export interface PortfolioCardProps {
  data: PortfolioType;
}

export function PortfolioCard({ data }: Readonly<PortfolioCardProps>) {
  return (
    <Card
      shadow='sm'
      padding='lg'
      withBorder
    >
      <Card.Section>
        <Image
          src={data.imageUrl}
          height={160}
          alt={data.name}
        />
      </Card.Section>

      <Group
        justify='space-between'
        mt='md'
        mb='xs'
      >
        <Text fw={500}>{data.name}</Text>
        <Badge color='pink'>On Sale</Badge>
      </Group>

      <Text
        size='sm'
        c='dimmed'
      >
        {data.description}
      </Text>

      <Button
        color='primary'
        fullWidth
        mt='md'
        leftSection={<Edit size={14} />}
      >
        Edit
      </Button>
    </Card>
  );
}
