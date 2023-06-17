import React from "react";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {};

const Projections = (props: Props) => {
  return (
    <main className="flex flex-1 items-start justify-center max-w-full">
      <div className="flex-1 px-12 py-12">
        <Title>Demo</Title>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

        <TabGroup className="mt-6">
          <TabList>
            <Tab>Demo</Tab>
            <Tab>Playground</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                <Card>
                  {/* Placeholder to set height */}
                  <div className="h-28" />
                </Card>
                <Card>
                  {/* Placeholder to set height */}
                  <div className="h-28" />
                </Card>
                <Card>
                  {/* Placeholder to set height */}
                  <div className="h-28" />
                </Card>
              </Grid>
              <div className="mt-6">
                <Card>
                  <div className="h-80" />
                </Card>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="mt-6">
                <Card>
                  <div className="h-96" />
                  <Slider />
                </Card>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
};

export default Projections;
