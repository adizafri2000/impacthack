import React, { useContext, useState, Fragment, useEffect } from "react";
import {
  BadgeDelta,
  Card,
  Grid,
  Flex,
  Metric,
  ProgressBar,
  Text,
  BarChart,
  Subtitle,
  LineChart,
  Button,
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import { DocumentAddIcon, CalendarIcon } from "@heroicons/react/outline";

import InflowsT from "../components/InflowsTable";
import OutflowsT from "../components/OutflowsTable";
import { flowItem, lineChartdata, chartdata } from "../data/DumyData";
import { DataContext } from "../Context";
import Modal from "../components/Modal";
import Modal2 from "../components/Modal2";

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export function SelectExample() {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <Select>
        <SelectItem value="1" icon={DocumentAddIcon}>
          Add Inflow
        </SelectItem>
        <SelectItem value="2" icon={DocumentAddIcon}>
          Add Outflow
        </SelectItem>
      </Select>
    </div>
  );
}

export function MonthSelector(onChange: any) {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <Select onChange={onChange}>
        <SelectItem value="0" icon={CalendarIcon}>
          March
        </SelectItem>
        <SelectItem value="1" icon={CalendarIcon}>
          April
        </SelectItem>
        <SelectItem value="2" icon={CalendarIcon}>
          May
        </SelectItem>
      </Select>
    </div>
  );
}

interface CashFlowRecord {
  closingBalance: number | null;
  createdAt: string;
  id: number;
  inflow: number;
  month: string;
  outflow: number;
  profit: number;
  updatedAt: string;
}

interface Iflow {
  value: number;
  delta: number;
}

const inflow: Iflow[] = [
  {
    value: 0.0,
    delta: 0,
  },
];

const outflow: Iflow[] = [
  {
    value: 3755,
    delta: 3.25,
  },
];

const Cashflow = () => {
  interface CashFlowRecord {
    inflow: number;
    outflow: number;
    month: string;
    profit: number;
    closingBalance: number;
    createdAt: string;
    updatedAt: string;
  }

  //  setup data dashboard
  type Kpi = {
    title: any;
    metric: any;
    progress: any;
    previous: any;
    delta: any;
    deltaType: any;
  };

  const { isLoading, cashFlowData, date, clsblc } = useContext(DataContext);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [inOutflowData, setInOutFlowData] = useState<any>([inflow, outflow]);
  const [cashFlowSelected, setCashFlowSelected] = useState<CashFlowRecord>();
  const [cashFlow, setCashFlow] = useState<CashFlowRecord[]>([]);



  let [isOpen, setIsOpen] = useState(false);
  let [isOpen2, setIsOpen2] = useState(false);


  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  const handleMonthChange = (value: any) => {
    setSelectedMonth(value);
    setCashFlowSelected(cashFlowData.cashFlowRecordList[value]);
    console.log(`Selected month: ${value}`);


  };

  return (
    <main className="flex flex-1 items-start justify-center max-w-full">
      <div className="px-12 py-12 flex-1">
        <div className="flex flex-1 flex-row justify-between py-4">
          <div className="flex">
            <div className="px-4 text-3xl font-bold">Cash Flow</div>
            {MonthSelector(handleMonthChange)}
          </div>

          <div className="space-x-4 mr-2">
            <Button
              size="lg"
              icon={DocumentAddIcon}
              onClick={openModal}
              disabled={clsblc === null ? true : false}
            >
              Add Data Outflow
            </Button>
            <Button size="lg" icon={DocumentAddIcon} onClick={openModal2}>
              Add Data Inflow
            </Button>
          </div>
        </div>
        <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
            <Card className="flex-1">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>INFLOW</Text>
                  <Metric className="truncate">RM {cashFlowSelected?.inflow}</Metric>
                </div>
              </Flex>
              {/* <Flex className="mt4 space-x-2"></Flex> */}
            </Card>
            <Card className="flex-1">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>OUTFLOW</Text>
                  <Metric className="truncate">RM {cashFlowSelected?.outflow}</Metric>
                </div>
              </Flex>
              {/* <Flex className="mt4 space-x-2"></Flex> */}
            </Card>
        </Grid>

        <Modal isOpen={isOpen} closeModal={closeModal} />
        <Modal2 isOpen={isOpen2} closeModal={closeModal2} />

        <TabGroup className="mt-6">
          <TabList>
            <Tab>Inflows</Tab>
            <Tab>Outflows</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InflowsT />
            </TabPanel>
            <TabPanel>
              <OutflowsT />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
};

export default Cashflow;
