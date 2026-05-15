import {
  Card,
  CardBody,
  CardCell,
  CardFooter,
  CardHeader,
  CardHeaderContent,
  Skeleton,
  Typography
} from '@sollapay/ui/components';
import {useTranslation} from 'react-i18next';

function TrustAccountCardSkeleton() {
  const {t} = useTranslation('trustAccounts');

  return (
    <Card>
      <CardHeader>
        <CardHeaderContent>
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-col gap-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
        </CardHeaderContent>
        <div className="flex h-12 items-center gap-3 rounded-lg bg-background-secondary p-2">
          <Skeleton className="size-5 shrink-0 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </CardHeader>

      <CardBody className="grid flex-1 grid-cols-2 gap-y-4">
        <CardCell>
          <Typography size="xs" color="tertiary">
            {t('card.type')}
          </Typography>
          <Skeleton className="mt-1 h-4 w-20" />
        </CardCell>
        <CardCell>
          <Typography size="xs" color="tertiary">
            {t('status')}
          </Typography>
          <Skeleton className="mt-1 h-5 w-20 rounded-full" />
        </CardCell>
        <CardCell>
          <Typography size="xs" color="tertiary">
            {t('card.date')}
          </Typography>
          <Skeleton className="mt-1 h-4 w-24" />
        </CardCell>
        <CardCell>
          <Typography size="xs" color="tertiary">
            {t('card.developer')}
          </Typography>
          <Skeleton className="mt-1 h-4 w-20" />
        </CardCell>
      </CardBody>

      <CardFooter>
        <Skeleton className="h-9 w-full rounded-md" />
      </CardFooter>
    </Card>
  );
}

export function TrustAccountCardListSkeleton() {
  return (
    <div
      data-slot="trust-account-card-list-skeleton"
      className="grid grid-cols-3 gap-8 2xl:grid-cols-4"
    >
      {Array.from({length: 6}).map((_, i) => (
        <TrustAccountCardSkeleton key={i} />
      ))}
    </div>
  );
}
