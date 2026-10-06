type TError = unknown;

interface BaseBlockType {
  id: string;
  collection: CollectionNames;
  hideBlock?: boolean;
  container?: boolean;
  cssClass?: string;
  item?: BlockRichText | BlockListing;
}

interface PageBlockType extends BaseBlockType {
  title: string;
  seo: string;
  blocks?: BaseBlockType[];
}

interface BlockRichText extends BaseBlockType {
  content: string;
}

interface BlockListing extends BaseBlockType {
  type: 'listing' | 'experience';
  items: Array<string | ExperienceType>;
}

interface ExperienceType {
  startDate?: string;
  endDate?: string;
  workplace?: string;
  description?: string;
  position?: string;
}

enum CollectionNames {
  BlockRichText = 'block_rich_text',
  BlockListing = 'block_listing',
}
