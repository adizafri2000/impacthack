import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  BadgeDelta,
  Card,
  Grid,
  Flex,
  Metric,
  ProgressBar,
  Text,
  BarList,
  Col,
  DonutChart,
  Title,
} from "@tremor/react";
import { cashflowData, dataListItem } from "../data/DumyData";

// add indicator of activities (progress,  completion, etc2...)

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <main className="flex flex-1 items-start justify-center max-w-full">
      <div className="px-12 py-12 ">
        <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
          <Card className="max-w-lg">
            <Title>Cashflow Health Indicator</Title>
            <Metric>Healthy</Metric>
          </Card>
          <Col numColSpan={1}>
            <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
              {cashflowData.map((item) => (
                <Card key={item.title}>
                  <Flex alignItems="start">
                    <div className="truncate ">
                      <Text>{item.title}</Text>
                      <Metric className="truncate">{item.metric}</Metric>
                    </div>
                    <BadgeDelta deltaType={item.deltaType}>
                      {item.delta}
                    </BadgeDelta>
                  </Flex>
                  <Flex className="mt-4 space-x-2">
                    <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
                    <Text>{item.target}</Text>
                  </Flex>
                  {/* <ProgressBar value={item.progress} className="mt-2" /> */}
                </Card>
              ))}
            </Grid>
          </Col>
        </Grid>

        {isMobile ? null : (
          <div className="mt-6">
            <Card
              className="max-w-lg mx-auto red"
              decoration="top"
              decorationColor="indigo"
            >
              <Text color="red">Alert</Text>
              <Metric>3 Items</Metric>
              <BarList data={dataListItem} className="mt-2" />
            </Card>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
