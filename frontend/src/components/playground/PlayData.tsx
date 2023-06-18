import React, { useContext, useEffect, useRef, useState } from "react";
import { Grid, Card, Flex, Metric, Text, BadgeDelta } from "@tremor/react";
import { cashflowData } from "../../data/DumyData";
import { PlaygroundContext } from "../../pages/Projections";
import { DeltaType } from "@tremor/react";

type Props = {};


export type Kpi = {
  title: string;
  metric: any;
  delta: string;
  deltaType: DeltaType;
};

const PlayData = (props: Props) => {
  const { selectedCategory, userInputValue, isUpdate } =
    useContext(PlaygroundContext);
  const [data, setData] = useState<Kpi[]>(cashflowData);
  const updateRef = useRef(false);


  function updateData(
    selectedCategory: string,
    value: any
  ){
    console.log(selectedCategory);
    if(selectedCategory=="Outflow"){
      data.map((item) => {
        if(item.title=="Outflow"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Closing Balance"){
          item.metric = parseInt(item.metric) - parseInt(value);
          item.deltaType = "moderateDecrease";
        }
        if(item.title=="Profit"){
          item.metric = parseInt(item.metric) - parseInt(value);
          item.deltaType = "moderateDecrease";
        }
        if(item.title=="Inflow"){
          item.deltaType = "unchanged";
        }
        // return item;
      });
    }
    if(selectedCategory=="Inflow"){
      data.map((item) => {
        if(item.title=="Inflow"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Closing Balance"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Profit"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Outflow"){
          item.deltaType = "unchanged";
        }
        // return item;
      });
    }

    if(selectedCategory=="Profit"){
      data.map((item) => {
        if(item.title=="Profit"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Closing Balance"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Inflow"){
          item.metric = parseInt(item.metric) + parseInt(value);
          item.deltaType = "moderateIncrease";
        }
        if(item.title=="Outflow"){
          item.deltaType = "unchanged";
        }
        // return item;
      });
      
    }

    if(selectedCategory=="Closing Balance"){
      data.map((item) => {
        if(item.title=="Closing Balance"){
          item.metric = parseInt(item.metric) + parseInt(value);
        }
        if(item.title=="Profit"){
          item.metric = parseInt(item.metric) + parseInt(value);
        }
        if(item.title=="Inflow"){
          item.metric = parseInt(item.metric) + parseInt(value);
        }
        if(item.title=="Outflow"){
          item.deltaType = "unchanged";
        }
        // return item;
      });
      
    }
    
  }


  useEffect(() => {    
      console.log("asiuuu");
      return updateData(selectedCategory, userInputValue);
  }, [isUpdate]);

  return (
    <Grid numItemsMd={2} numItemsLg={2} className="gap-6 flex-1">
      {data.map((item) => (
        <Card key={item.title}>
          <Flex alignItems="start">
            <div className="truncate ">
              <Text>{item.title} (RM)</Text>
              <Metric className="truncate">{item.metric}</Metric>
            </div>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <BadgeDelta deltaType={item.deltaType}>
              {item.delta}
            </BadgeDelta>
          </Flex>

          {/* <ProgressBar value={item.progress} className="mt-2" /> */}
        </Card>
      ))}
    </Grid>
  );
};

export default PlayData;
