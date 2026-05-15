import {Button} from '@sollapay/ui';
import {useTranslation} from 'react-i18next';

interface ShowMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
}

export function ShowMoreButton({onLoadMore, isLoading}: ShowMoreButtonProps) {
  const {t} = useTranslation('trustAccounts');

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-px flex-1 bg-border-subtle" />
      <Button variant="secondary" size="sm" onClick={onLoadMore} disabled={isLoading}>
        {t('view.activity.showMore')}
      </Button>
      <div className="h-px flex-1 bg-border-subtle" />
    </div>
  );
}
