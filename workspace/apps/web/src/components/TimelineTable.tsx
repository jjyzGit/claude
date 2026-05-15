import type {ReactNode} from 'react';

export interface TimelineGroup<TItem> {
  id: string;
  header: ReactNode;
  items: TItem[];
}

export interface TimelineTableProps<TItem> {
  groups: TimelineGroup<TItem>[];
  renderItem: (item: TItem, groupId: string) => ReactNode;
  getItemKey: (item: TItem) => string;
  emptyState?: ReactNode;
  className?: string;
}

export function TimelineTable<TItem>({
  groups,
  renderItem,
  getItemKey,
  emptyState,
  className
}: TimelineTableProps<TItem>) {
  if (groups.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={className}>
      {groups.map(group => (
        <div key={group.id} className="flex flex-col gap-4">
          {group.header}
          <div className="flex flex-col gap-4">
            {group.items.map(item => (
              <div key={getItemKey(item)}>{renderItem(item, group.id)}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
