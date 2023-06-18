import React, { useState, createContext } from "react";
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
  BadgeDelta,
  Flex,
  Metric,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { cashflowData, configData } from "../data/DumyData";
import ConfigTab from "../components/ConfigTab";
import PlayData from "../components/playground/PlayData";
import demo1 from "../assets/demo1.png";
import demo2 from "../assets/demo2.png";
import demo3 from "../assets/demo3.png";

type Props = {};

export const PlaygroundContext = createContext<any>(null);

const Projections = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("Inflow");
  const [userInputValue, setUserInputValue] = useState<number>(0);
  const [selectedName, setSelectedName] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  return (
    <PlaygroundContext.Provider value={{selectedCategory, setSelectedCategory, userInputValue, setUserInputValue, isUpdate, setIsUpdate}}>
      <main className="flex flex-1 items-start justify-center max-w-full">
        <div className="flex-1 px-12 py-12">
          <Title style={{ fontSize: "2rem", color:'black'}} className="mb-2">Understand the cost structure of your business</Title>
          <Text>It helps you to manage you business financial better</Text>

          <TabGroup className="mt-6">
            <TabList>
              <Tab>Demo</Tab>
              <Tab>Playground</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6 mb-6">
                <img src={demo1} alt="logo" />
                <Title style={{ fontSize: "1rem", color:'black'}}>There are 4 financial categories, each of them corresponding to your business internal finances</Title>
                </Grid>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6 mb-6">
                <img src={demo2} alt="logo" />
                <Title style={{ fontSize: "1rem", color:'black'}}>When you adjust an item's finances. other items will change too. Take some time getting used to tweaking the values that you can understand the cascading effects.</Title>
                </Grid>
                <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
                <img src={demo3} alt="logo" />
                <Title style={{ fontSize: "1rem", color:'black'}}>On the right is an adjustment tool to pick an item on the left, and adjust the financial value with the slider of input</Title>
                </Grid>
              </TabPanel>
              <TabPanel>
                <div className="mt-6 flex">
                  <PlayData />
                  <Grid className="flex-1">
                    <Flex alignItems="center" flexDirection="col">
                      <ConfigTab />
                    </Flex>
                  </Grid>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </main>
    </PlaygroundContext.Provider>
  );
};

export default Projections;
