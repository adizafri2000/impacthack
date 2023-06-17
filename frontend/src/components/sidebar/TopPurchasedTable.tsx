import React, { useState } from "react";
import {
  Icon,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  BadgeDelta,
  Title,
  Flex,
  Select,
  SelectItem,
  MultiSelect,
  MultiSelectItem,
  DeltaType,
} from "@tremor/react";
import { InformationCircleIcon } from "@heroicons/react/solid";

export type Items = {
  name: string;
  quantity: string;
  total: string;
};

const tableItem: Items[] = [
  {
    name: "Kacang",
    quantity: "10",
    total: "100",
  },
  {
    name: "Chocolate",
    quantity: "5",
    total: "50",
  },
  {
    name: "Madu",
    quantity: "2",
    total: "20",
  },
  {
    name: "Bottle",
    quantity: "10",
    total: "10",
  },
  {
    name: "Cap",
    quantity: "0",
    total: "0",
  },
  {
    name: "Wrapper",
    quantity: "3",
    total: "30",
  },
];

type Props = {};

const deltaTypes: { [key: string]: DeltaType } = {
  unchanged: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

const TopPurchasedTable = (props: Props) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  return (
    <>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell className="text-right">Frequency</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Total Price Diff.
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableItem.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                RM {item.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TopPurchasedTable;
