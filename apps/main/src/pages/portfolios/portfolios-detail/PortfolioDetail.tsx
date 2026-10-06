import { useParams } from 'react-router-dom';
import { usePortfolioByIdQuery } from '../../../shared/hooks/useProfile';

export function PortfolioDetail() {
  const { id } = useParams();
  const { data: rawData } = usePortfolioByIdQuery(id ?? '', {
    enabled: !!id,
  });

  if (!rawData) {
    return <>Please go to playground to edit your portfolio</>;
  }
  const { name, description } = rawData;

  return (
    <div>
      Hello <strong>{name}</strong>, this is the portfolio detail page. {description}
    </div>
  );
}
