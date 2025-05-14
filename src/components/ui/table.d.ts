declare module '@/components/ui/table' {
  import React from 'react';

  export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>>;
  export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>>;
  export const TableHead: React.FC<React.HTMLAttributes<HTMLTableCellElement>>;
  export const TableCell: React.FC<React.HTMLAttributes<HTMLTableCellElement>>;
}
