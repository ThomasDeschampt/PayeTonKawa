"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import React from "react";

export interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  renderActions?: (item: T) => React.ReactNode;
}

export default function GenericTable<T>({
  data,
  columns,
  renderActions,
}: GenericTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, i) => (
              <TableCell key={i}>{col.label}</TableCell>
            ))}
            {renderActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((item, i) => (
            <TableRow key={i}>
              {columns.map((col, j) => (
                <TableCell key={j}>{col.render(item)}</TableCell>
              ))}
              {renderActions && <TableCell>{renderActions(item)}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
