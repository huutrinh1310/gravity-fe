import { Autocomplete, Button, Flex, Group, Modal, Radio, Text, TextInput, Title } from '@mantine/core';

import { useForm } from '@mantine/form';

import { useDisclosure } from '@mantine/hooks';
import { PlusIcon } from 'lucide-react';

export interface PortfolioCreateProperties {
  content: string;
}

export function PortfolioCreate({ content }: Readonly<PortfolioCreateProperties>) {
  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {},
  });

  const handleSubmit = async () => {
    open();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={<Title fz="h3">Create new portfolio</Title>} size="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex direction="column" gap="md">
            <TextInput
              label={
                <Text fz="md" fw={500} display="inline-block">
                  Portfolio Name
                </Text>
              }
              placeholder="Enter portfolio name"
              required
            />
            <Autocomplete
              label={
                <Text fz="md" fw={500} display="inline-block">
                  Portfolio Layout
                </Text>
              }
              placeholder="Select template layout"
              data={['Template 1', 'Template 2', 'Template 3']}
            />
            <Radio.Group
              name="favoriteFramework"
              label={
                <Text fz="md" fw={500} display="inline-block">
                  Visibility Status
                </Text>
              }
              withAsterisk
            >
              <Flex direction="column" gap="xs" mt="xs">
                <Radio value="public" label="Public portfolio" description="Anyone with the link can view. Recommended for active monographs." />
                <Radio value="private" label="Private draft" description="Only visible to you. Recommended during active curation." />
              </Flex>
            </Radio.Group>
          </Flex>
          <Group mt="md">
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Group>
        </form>
      </Modal>

      <Button className="portfolio-header-button" leftSection={<PlusIcon />} onClick={open}>
        {content}
      </Button>
    </>
  );
}
