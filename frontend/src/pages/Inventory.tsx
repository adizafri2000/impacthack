import React from "react";
import {
  Card,
  Flex,
  Grid,
  Metric,
  Text,
  DonutChart,
  Title,
  Col,
  BarList,
  Button,
} from "@tremor/react";
import PriceChangeTable from "../components/PriceChangeTable";
import TopPurchasedTable from "../components/sidebar/TopPurchasedTable";
import { dataListItem, increasedItems } from "../data/DumyData";

type Props = {};


export const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("ms").format(number).toString()}`;

// set col span utk action and  item card

const Inventory = (props: Props) => {
  return (
    <main className="flex flex-1 flex-col justify-center max-w-full">
      <div className="px-12 py-12">
        <Grid numItemsMd={3} numItemsLg={3} className="mt-6 gap-6">
          <Card
            className="max-w-lg mx-auto red"
            decoration="top"
            decorationColor="indigo"
          >
            <Flex alignItems="start">
              <div className="truncate h-28 w-40">
                <Text color="red">Alert</Text>
                <Metric>Take Action Now!</Metric>
              </div>
            </Flex>
            <Flex justifyContent="center" className="px-4 py-4">
              <Button size="xs" variant="primary">
                View more
              </Button>
            </Flex>
          </Card>
          <Card
            className="max-w-lg mx-auto red"
            decoration="top"
            decorationColor="indigo"
          >
            <Text color="red">Alert</Text>
            <Metric>3 Items</Metric>
            <BarList data={dataListItem} className="mt-2" />
          </Card>

          <Card className="max-w-lg">
            <Title>Top Increased Item 2023</Title>
            <DonutChart
              className="mt-6"
              data={increasedItems}
              category="quantity"
              index="name"
              valueFormatter={valueFormatter}
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
          </Card>
        </Grid>

        <div className="mt-6">
          <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
            <Col numColSpan={1} numColSpanLg={2}>
              <Card>
                <PriceChangeTable />
              </Card>
            </Col>
            <Card>
              <Text>Top Increased Item (June)</Text>
              <Metric>KPI 2</Metric>

              <TopPurchasedTable />
            </Card>
          </Grid>
        </div>
      </div>
    </main>
  );
};

export default Inventory;
