import {
  Button,
  Icon,
  Popover,
  PopoverButton,
  PopoverContent,
  PopoverTrigger,
  toast
} from '@sollapay/ui/components';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {
  buildExportFilename,
  downloadBlob,
  sanitizeXlsxSheetName,
  toCsvBlob,
  toXlsxBlob
} from '@/utils';

import type {ExportColumn, ExportFormat} from '@/utils';
import type {FC} from 'react';

export type {ExportColumn, ExportFormat};

export interface ListExportMenuProps<T> {
  rows: T[];
  columns: ExportColumn<T>[];
  refId: string;
  entity: string;
  sheetName: string;
  disabled?: boolean;
}

function ListExportMenuInner<T>({
  rows,
  columns,
  refId,
  entity,
  sheetName,
  disabled
}: ListExportMenuProps<T>) {
  const {t} = useTranslation('common');
  const [isExporting, setIsExporting] = useState(false);

  const handleCsv = async () => {
    try {
      setIsExporting(true);
      const blob = toCsvBlob(rows, columns);
      downloadBlob(blob, buildExportFilename(refId, entity, 'csv'));
      toast.success(t('export.success'));
    } catch {
      toast.error(t('export.error'));
    } finally {
      setIsExporting(false);
    }
  };

  const handleXlsx = async () => {
    try {
      setIsExporting(true);
      const blob = await toXlsxBlob(rows, columns, sanitizeXlsxSheetName(sheetName));
      downloadBlob(blob, buildExportFilename(refId, entity, 'xlsx'));
      toast.success(t('export.success'));
    } catch {
      toast.error(t('export.error'));
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="secondary"
            size="sm"
            disabled={disabled || isExporting}
            icon={<Icon name="download" />}
            iconPosition="start"
          >
            {t('export.trigger')}
          </Button>
        }
      />
      <PopoverContent align="end" className="w-48 gap-1 p-1.25">
        <PopoverButton icon="file-lined" onClick={handleCsv}>
          {t('export.csv')}
        </PopoverButton>
        <PopoverButton icon="table" onClick={handleXlsx}>
          {t('export.xlsx')}
        </PopoverButton>
      </PopoverContent>
    </Popover>
  );
}

export const ListExportMenu = ListExportMenuInner as <T>(
  props: ListExportMenuProps<T>
) => ReturnType<FC>;
