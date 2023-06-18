import React, { useState, useContext } from "react";
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
import { inflowTableItem } from "../data/DumyData";
import { DataContext } from "../Context";

type Props = {};

const deltaTypes: { [key: string]: DeltaType } = {
  unchanged: "unchanged",
  overperforming: "moderateIncrease",
  underperforming: "moderateDecrease",
};

const InflowsT = (props: Props) => {

  const {isLoading,inflowData} = useContext(DataContext);
   if (!isLoading && inflowData){
    console.log(inflowData, "id")
   }

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
      
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell className="text-right">Value</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {inflowTableItem.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">RM {item.value}</TableCell>
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

export default InflowsT;
