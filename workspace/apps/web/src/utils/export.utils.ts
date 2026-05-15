export interface ExportColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
  /** Optional numeric value used only for XLSX cells (enables sorting/summing in Excel). Falls back to `value` when absent. */
  rawValue?: (row: T) => number | null | undefined;
}

export type ExportFormat = 'csv' | 'xlsx';

// --- CSV ---

const UTF8_BOM = '\uFEFF';

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function toCsvBlob<T>(rows: T[], columns: ExportColumn<T>[]): Blob {
  const headers = columns.map(col => escapeCsvCell(col.header));
  const lines: string[] = [headers.join(',')];

  for (const row of rows) {
    const cells = columns.map(col => {
      const val = col.value(row);
      return escapeCsvCell(val == null ? '' : String(val));
    });
    lines.push(cells.join(','));
  }

  return new Blob([UTF8_BOM + lines.join('\r\n')], {type: 'text/csv;charset=utf-8'});
}

// --- XLSX ---

export async function toXlsxBlob<T>(
  rows: T[],
  columns: ExportColumn<T>[],
  sheetName: string
): Promise<Blob> {
  const {Workbook} = await import('exceljs');

  const headers = columns.map(col => col.header);
  const data = rows.map(row =>
    columns.map(col => (col.rawValue ? (col.rawValue(row) ?? '') : (col.value(row) ?? '')))
  );

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  worksheet.addRow(headers);
  for (const row of data) {
    worksheet.addRow(row);
  }

  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
}

// --- Download ---

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}

// --- Filename ---

export function buildExportFilename(
  refId: string,
  entity: string,
  format: ExportFormat,
  date: Date = new Date()
): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const ext = format === 'xlsx' ? 'xlsx' : 'csv';
  return `${refId}-${entity}-${yyyy}-${mm}-${dd}.${ext}`;
}

// Excel sheet names: max 31 chars, forbidden chars [ ] : * / \ ?
export function sanitizeXlsxSheetName(name: string): string {
  const sanitized = name
    .replace(/[[\]:*/\\?]/g, '')
    .slice(0, 31)
    .trim();

  return sanitized || 'Export';
}
