import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import Cashflow from "./pages/Cashflow";
import Inventory from "./pages/Inventory";
import Projections from "./pages/Projections";
import { DataProvider } from "./Context";

type Props = {};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="cashflow" element={<Cashflow />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="projection" element={<Projections />} />
    </Route>
  )
);

const App = () => {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
};

export default App;
