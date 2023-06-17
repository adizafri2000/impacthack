import React from "react";
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
import { CalculatorIcon } from "@heroicons/react/outline";
import InflowsT from "../components/InflowsTable";
import OutflowsT from "../components/OutflowsTable";
import { flowItem, lineChartdata,  chartdata } from "../data/DumyData";



const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export function SelectExample() {
  return (
    <div className="max-w-sm mx-auto space-y-6">
      <Select>
        <SelectItem value="1" icon={CalculatorIcon}>
          Add Inflow
        </SelectItem>
        <SelectItem value="2" icon={CalculatorIcon}>
          Add Outflow
        </SelectItem>
      </Select>
    </div>
  );
}

const Cashflow = () => {
  return (
    <main className="flex flex-1 items-start justify-center max-w-full">
      <div className="px-12 py-12 flex-1">
        <div className="flex flex-1 flex-row justify-between py-4">
          <div className="ml-8 text-3xl font-bold">Cash Flow</div>
          <div className="space-x-4 mr-8">
            {/* <Button size="lg">New</Button>
            <Button size="lg">Download</Button> */}
            {SelectExample()}
          </div>
        </div>
        <Grid numItemsMd={2} numItemsLg={2} className="mt-6 gap-6">
          {flowItem.map((item) => (
            <Card key={item.title} className="flex-1">
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>{item.title}</Text>
                  <Metric className="truncate">{item.value}</Metric>
                </div>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
              </Flex>
              {/* <Flex className="mt4 space-x-2"></Flex> */}
            </Card>
          ))}
        </Grid>

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

{
  /* <BarChart
                  className="mt-6"
                  data={chartdata}
                  index="name"
                  categories={["Number of threatened species"]}
                  colors={["blue"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={80}
                /> 
                <LineChart
                  className="mt-6"
                  data={lineChartdata}
                  index="year"
                  categories={["Export Growth Rate"]}
                  colors={["emerald"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={80}
                />*/
}
