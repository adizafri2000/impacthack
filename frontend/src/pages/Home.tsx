import React, { useEffect, useState, useContext } from "react";
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
  DeltaType,
  Bold,
} from "@tremor/react";
import { cashflowData, dataListItem } from "../data/DumyData";
import { DataContext } from "../Context";

const Home = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { clsblc, setClsblc } = useContext(DataContext);
  // console.log(cashFlowData, "cfd home")

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

  //  setup data dashboard
  type financialHealthType = {
    status: any;
    color: any;
  };

  const [cashFlow, setCashFlow] = useState<CashFlowRecord[]>([]);
  const [cashFlowLastMonth, setCashFlowLastMonth] = useState<CashFlowRecord>();
  const [cashFlowSecLastMonth, setCashFlowSecLastMonth] =
    useState<CashFlowRecord>();
  const [cashflowDataStats, setCashflowDataStats] = useState<Kpi[]>([]);
  const [financialHealthStatus, setFinancialHealthStatus] =
    useState<financialHealthType>();
  const [monthFormatted, setMonthFormatted] = useState<any>();

  const fetchCashFlowData = () => {
    fetch("http://192.168.0.100:8081/cashflows")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCashFlow(data.cashFlowRecordList);
      });
  };

  useEffect(() => {
    console.log("run");
    // fetch cashflowData
    fetchCashFlowData();

    // get last month data
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    cashFlow.forEach((item, index) => {
      const itemDate = new Date(item.month);
      const itemMonth = itemDate.getMonth() + 1;
      if (itemMonth === currentMonth - 1) {
        setCashFlowLastMonth(item);
        const formattedMonth = new Date(item?.month).toLocaleString("en-MY", {
          month: "long",
          year: "numeric",
        });
        setMonthFormatted(formattedMonth);
      }
      if (itemMonth === currentMonth - 2) {
        setCashFlowSecLastMonth(item);
      }
    });

    // set data dashboard
    const dataStats: Kpi[] = [
      {
        title: "INFLOW (RM)",
        metric:
          cashFlowLastMonth?.inflow == null ? "NA" : cashFlowLastMonth?.inflow,
        progress: 15.9,
        previous:
          cashFlowSecLastMonth?.inflow == null
            ? "NA"
            : cashFlowSecLastMonth?.inflow,
        delta:
          cashFlowLastMonth?.inflow == 0
            ? -100
            : (
                (Math.abs(
                  (cashFlowLastMonth?.inflow ?? 0) -
                    (cashFlowSecLastMonth?.inflow ?? 0)
                ) /
                  (cashFlowLastMonth?.inflow ?? 0)) *
                100
              ).toFixed(2),
        deltaType:
          (cashFlowLastMonth?.inflow == 0
            ? -100
            : (Math.abs(
                (cashFlowLastMonth?.inflow ?? 0) -
                  (cashFlowSecLastMonth?.inflow ?? 0)
              ) /
                (cashFlowLastMonth?.inflow ?? 0)) *
              100) > 0
            ? "moderateIncrease"
            : "moderateDecrease",
      },
      {
        title: "OUTFLOW (RM)",
        metric:
          cashFlowLastMonth?.outflow == null
            ? "NA"
            : cashFlowLastMonth?.outflow,
        progress: 36.5,
        previous:
          cashFlowSecLastMonth?.outflow == null
            ? "NA"
            : cashFlowSecLastMonth?.outflow,
        delta:
          cashFlowLastMonth?.outflow == 0
            ? -100
            : (
                (Math.abs(
                  (cashFlowLastMonth?.outflow ?? 0) -
                    (cashFlowSecLastMonth?.outflow ?? 0)
                ) /
                  (cashFlowLastMonth?.outflow ?? 0)) *
                100
              ).toFixed(2),
        deltaType:
          (cashFlowLastMonth?.outflow == 0
            ? -100
            : (Math.abs(
                (cashFlowLastMonth?.outflow ?? 0) -
                  (cashFlowSecLastMonth?.outflow ?? 0)
              ) /
                (cashFlowLastMonth?.outflow ?? 0)) *
              100) > 0
            ? "moderateIncrease"
            : "moderateDecrease",
      },
      {
        title: "PROFIT (RM)",
        metric:
          cashFlowLastMonth?.profit == null ? "NA" : cashFlowLastMonth?.profit,
        progress: 53.6,
        previous:
          cashFlowSecLastMonth?.profit == null
            ? "NA"
            : cashFlowSecLastMonth?.profit,
        delta:
          cashFlowLastMonth?.profit == 0
            ? -100
            : (
                (Math.abs(
                  (cashFlowLastMonth?.profit ?? 0) -
                    (cashFlowSecLastMonth?.profit ?? 0)
                ) /
                  (cashFlowLastMonth?.profit ?? 0)) *
                100
              ).toFixed(2),
        deltaType:
          (cashFlowLastMonth?.profit == 0
            ? -100
            : (Math.abs(
                (cashFlowLastMonth?.profit ?? 0) -
                  (cashFlowSecLastMonth?.profit ?? 0)
              ) /
                (cashFlowLastMonth?.profit ?? 0)) *
              100) > 0
            ? "moderateIncrease"
            : "moderateDecrease",
      },
      {
        title: "CLOSING BALANCE (RM)",
        metric:
          cashFlowLastMonth?.closingBalance == null
            ? "NA"
            : cashFlowLastMonth?.closingBalance,
        progress: 53.6,
        previous:
          cashFlowSecLastMonth?.closingBalance == null
            ? "NA"
            : cashFlowSecLastMonth?.closingBalance,
        delta:
          cashFlowLastMonth?.closingBalance == 0 ||
          cashFlowLastMonth?.closingBalance == null
            ? -100
            : (
                (Math.abs(
                  (cashFlowLastMonth?.closingBalance ?? 0) -
                    (cashFlowSecLastMonth?.closingBalance ?? 0)
                ) /
                  (cashFlowLastMonth?.closingBalance ?? 0)) *
                100
              ).toFixed(2),
        deltaType:
          (cashFlowLastMonth?.closingBalance == 0 ||
          cashFlowLastMonth?.closingBalance == null
            ? -100
            : (Math.abs(
                (cashFlowLastMonth?.closingBalance ?? 0) -
                  (cashFlowSecLastMonth?.closingBalance ?? 0)
              ) /
                (cashFlowLastMonth?.closingBalance ?? 0)) *
              100) > 0
            ? "moderateIncrease"
            : "moderateDecrease",
      },
    ];
    setCashflowDataStats(dataStats);

    const financialHealthData: financialHealthType = {
      status:
        (cashFlowLastMonth?.closingBalance == 0 ||
        cashFlowLastMonth?.closingBalance == null
          ? -100
          : (Math.abs(
              (cashFlowLastMonth?.closingBalance ?? 0) -
                (cashFlowSecLastMonth?.closingBalance ?? 0)
            ) /
              (cashFlowLastMonth?.closingBalance ?? 0)) *
            100) > 0
          ? "HEALTHY"
          : "NOT HEALTHY",
      color:
        (cashFlowLastMonth?.closingBalance == 0 ||
        cashFlowLastMonth?.closingBalance == null
          ? -100
          : (Math.abs(
              (cashFlowLastMonth?.closingBalance ?? 0) -
                (cashFlowSecLastMonth?.closingBalance ?? 0)
            ) /
              (cashFlowLastMonth?.closingBalance ?? 0)) *
            100) > 0
          ? "green"
          : "red",
    };

    setFinancialHealthStatus(financialHealthData);

    setClsblc(cashFlowLastMonth?.closingBalance);
  }, [cashFlow]);

  return (
    <main className="flex flex-1 items-start justify-center max-w-full">
      <div className="px-12 py-12 ">
        <Grid className="gap-12">
          <h1 style={{ fontSize: "2rem" }}>Cash Flow for {monthFormatted} </h1>
        </Grid>
        <Grid numItemsMd={2} numItemsLg={2} className="gap-6 ">
          <Card className="max-w-lg">
            <Title>Your financial health for {monthFormatted}</Title>
            <Metric
              style={{
                color: financialHealthStatus?.color,
                fontWeight: "bold",
              }}
            >
              {financialHealthStatus?.status}
            </Metric>
            <br></br>
            {cashFlowLastMonth?.closingBalance == null ? (
              <Title>
                <a style={{ backgroundColor: "red", padding: "3px" }}>
                  IMPORTANT
                </a>{" "}
                Please be reminded to update your sales data for{" "}
                {monthFormatted} in order to complete closing balance
              </Title>
            ) : null}
          </Card>
          <Col numColSpan={1}>
            <Grid numItemsMd={2} numItemsLg={2} className="gap-6">
              {cashflowDataStats.map((item) => (
                <Card key={item.title}>
                  <Flex alignItems="start">
                    <div className="truncate ">
                      <Text>{item.title}</Text>
                      <Metric className="truncate">{item.metric}</Metric>
                    </div>
                  </Flex>
                  <Flex className="mt-4 space-x-2">
                    <Text>Previous: {item.previous}</Text>
                    <BadgeDelta deltaType={item.deltaType}>
                      {item.delta}
                    </BadgeDelta>
                  </Flex>
                  {/* <ProgressBar value={item.progress} className="mt-2" /> */}
                </Card>
              ))}
            </Grid>
          </Col>
        </Grid>

        <div className="mt-12">
          <Card
            className="max-w-lg red"
            decoration="top"
            decorationColor="indigo"
          >
            <Text>Top 3 Material Purchase</Text>
            <BarList data={dataListItem} className="mt-2" />
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
