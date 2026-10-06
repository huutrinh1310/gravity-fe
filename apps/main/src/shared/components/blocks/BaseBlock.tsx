export interface BaseBlockProps {
  block: BaseBlockType;
}

export function BaseBlock({ block }: Readonly<BaseBlockProps>) {
  if (block.hideBlock) {
    return null;
  }
  const components: Record<CollectionNames, React.ElementType> = {
    // Add your block components here
    [CollectionNames.BlockRichText]: () => <>Richtext</>,
    [CollectionNames.BlockListing]: () => <>BlockListing</>,
  };

  const BlockComponent = components[block.collection];

  if (!BlockComponent) {
    console.error(`No component found for block type: ${block.collection}`);

    return null;
  }

  const extraProps: Record<string, unknown> = {};

  return (
    <BlockComponent
      {...extraProps}
      data={block.item}
    />
  );
}
