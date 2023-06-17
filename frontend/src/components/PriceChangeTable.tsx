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
import { priceTableData } from "../data/DumyData";



type Props = {};

const deltaTypes: { [key: string]: DeltaType } = {
  unchanged: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

const PriceChangeTable = (props: Props) => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  return (
    <>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Price Changes Alert</Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Shows inventory price changes"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="moderateIncrease">Increase</SelectItem>
          <SelectItem value="average">Decrease</SelectItem>
          <SelectItem value="unchanged">unchanged</SelectItem>
        </Select>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Price (RM / Unit)
            </TableHeaderCell>
            <TableHeaderCell className="text-right">
              Difference (RM / Unit)
            </TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {priceTableData.map((item) => (
            <TableRow key={item.name}>
              <TableCell>
                {item.name} ({item.unit})
              </TableCell>
              <TableCell className="text-right">
                <div>
                  <div>RM {item.curPrice.toString()}</div>
                  <div>RM {item.prevPrice.toString()}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div>
                  <div>RM {item.difference.toString()}</div>
                  <div>{item.delta.toString()} %</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <BadgeDelta deltaType={deltaTypes[item.status]} size="xs">
                  {item.status}
                </BadgeDelta>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PriceChangeTable;
