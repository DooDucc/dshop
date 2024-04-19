import React, { useEffect, useMemo, useState } from "react";
import { LuLaptop2 } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Column, Pie, Line } from "@ant-design/plots";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import {
  getMonthOrderIncome,
  getOrders,
  getYearStatistics,
} from "../redux/order/actions";
import { getProducts } from "../redux/product/actions";
import { months, monthOrder } from "../utils/constants";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { monthOrderIncome, yearStatistics, orders } = useSelector(
    (state) => state.order
  );
  const { products } = useSelector((state) => state.product);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [chartDataRevenue, setChartDataRevenue] = useState([]);
  const [chartDataSale, setChartDataSale] = useState([]);
  const [chartDataCategory, setChartDataCategory] = useState([]);
  const [chartDataBrand, setChartDataBrand] = useState([]);

  const years = useMemo(() => {
    return Array.from(
      new Set(orders?.map((order) => order?.createdAt.slice(0, 4)))
    )?.map((year) => ({
      value: year,
      label: year,
    }));
  }, [orders]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    dispatch(getMonthOrderIncome({ year: currentYear }));
    dispatch(getYearStatistics({ year: currentYear }));
  }, [currentYear]);

  useEffect(() => {
    if (monthOrderIncome?.length === 0) {
      setChartDataRevenue([]);
      setChartDataSale([]);
      return;
    }

    const dataRevenue = [];
    const dataSale = [];
    monthOrderIncome?.forEach((order) => {
      dataRevenue.push({
        month: months[order?._id?.month - 1],
        revenue: order?.revenue,
      });
      dataSale.push({
        month: months[order?._id?.month - 1],
        sales: order?.count,
      });
    });
    setChartDataRevenue(
      dataRevenue.sort((a, b) => monthOrder[a.month] - monthOrder[b.month])
    );
    setChartDataSale(
      dataSale.sort((a, b) => monthOrder[a.month] - monthOrder[b.month])
    );
  }, [monthOrderIncome]);

  useEffect(() => {
    const result = [];
    const categoryMap = {};

    products.forEach((product) => {
      if (categoryMap[product.category] === undefined) {
        categoryMap[product.category] = product.sold;
        result.push(product);
      } else {
        categoryMap[product.category] += product.sold;
      }
    });

    const dataCategory = result.map((product) => ({
      type: product.category,
      value: categoryMap[product.category],
    }));
    setChartDataCategory(dataCategory);
  }, [products]);

  useEffect(() => {
    const result = [];
    const brandMap = {};

    products.forEach((product) => {
      if (brandMap[product.brand] === undefined) {
        brandMap[product.brand] = product.sold;
        result.push(product);
      } else {
        brandMap[product.brand] += product.sold;
      }
    });

    const dataBrand = result.map((product) => ({
      type: product.brand,
      value: brandMap[product.brand],
    }));
    setChartDataBrand(dataBrand);
  }, [products]);

  const revenueChart = {
    data: chartDataRevenue,
    xField: "month",
    yField: "revenue",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  const saleChart = {
    data: chartDataSale,
    xField: "month",
    yField: "sales",
    scale: {
      y: {
        domainMax: 50,
      },
    },
    axis: {
      x: {
        labelFormatter: (val) => `${val}`,
      },
    },
  };

  const categoryChart = {
    data: chartDataCategory,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  const brandChart = {
    data: chartDataBrand,
    angleField: "value",
    colorField: "type",
    label: {
      text: "value",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };

  const handleChange = (value) => {
    setCurrentYear(+value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div
          className="d-flex p-3 justify-content-between align-items-end flex-grow-1 p-3 rounded-3"
          style={{
            backgroundColor: "#00d4ff",
          }}
        >
          <div>
            <p className="desc text-white fs-4">Products Sold</p>
            <h4 className="mb-0 sub-title">
              {yearStatistics?.length > 0 ? yearStatistics[0]?.soldProducts : 0}{" "}
              products
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <LuLaptop2 className="fs-4" />
            <p className="mb-0 desc fs-5 text-white">Yearly Products Sold</p>
          </div>
        </div>
        <div
          className="d-flex p-3 justify-content-between align-items-end flex-grow-1 p-3 rounded-3"
          style={{
            backgroundColor: "#eeaeca",
          }}
        >
          <div>
            <p className="desc text-white fs-4">Total Revenue</p>
            <h4 className="mb-0 sub-title">
              ${yearStatistics?.length > 0 ? yearStatistics[0]?.revenue : 0}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <FaMoneyCheckAlt className="fs-4" />
            <p className="mb-0 desc fs-5 text-white">Yearly Total Revenue</p>
          </div>
        </div>
        <div
          className="d-flex p-3 justify-content-between align-items-end flex-grow-1 p-3 rounded-3"
          style={{ backgroundColor: "#94bbe9" }}
        >
          <div>
            <p className="desc text-white fs-4">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {yearStatistics?.length > 0 ? yearStatistics[0]?.orders : 0}{" "}
              orders
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <AiOutlineShoppingCart className="fs-4" />
            <p className="mb-0 desc fs-5 text-white">Yearly Total Sales</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between mt-3">
        <div />
        <div className="d-flex align-items-center">
          <p className="mb-0 me-3 fs-5">Select year to get new Statisitics:</p>
          <Select
            size="large"
            defaultValue={currentYear}
            style={{ width: 200 }}
            onChange={handleChange}
            options={years}
          />
        </div>
      </div>
      {chartDataRevenue?.length > 0 && (
        <div className="w-100">
          <h3 className="mb-2 title">Revenue Statics</h3>
          <div>
            <Line {...revenueChart} />
          </div>
        </div>
      )}
      {chartDataSale?.length > 0 && (
        <div className="mt-5 w-100">
          <h3 className="mb-2 title">Sales Statics</h3>
          <div>
            <Column {...saleChart} />
          </div>
        </div>
      )}
      {monthOrderIncome?.length > 0 && (
        <div className="d-flex justify-content-between">
          <div className="mt-5 w-50">
            <h3 className="text-center">Sold Products By Category</h3>
          </div>
          <div className="mt-5 w-50">
            <h3 className="text-center">Sold Products By Brand</h3>
          </div>
        </div>
      )}
      {monthOrderIncome?.length > 0 && (
        <div className="d-flex justify-content-between">
          <div className="mt-2">
            {chartDataCategory?.length > 0 && <Pie {...categoryChart} />}
          </div>
          <div className="mt-2">
            {chartDataBrand?.length > 0 && <Pie {...brandChart} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
