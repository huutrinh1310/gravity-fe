import { BaseBlock } from './BaseBlock';

export interface PageBuilderProps {
  sections: BaseBlockType[];
}

export function PageBuilder({ sections }: Readonly<PageBuilderProps>) {
  if (!sections) {
    return <>No valid blocks</>;
  }

  return (
    <>
      {sections.map((item) => (
        <BaseBlock
          key={item.id}
          block={item}
        />
      ))}
    </>
  );
}
