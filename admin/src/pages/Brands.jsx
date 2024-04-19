import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands } from "../redux/brand/actions";
import { resetState } from "../redux/brand/slice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Brands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { brands } = useSelector((state) => state.brand);

  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    const data = [];
    brands?.forEach((brand, index) => {
      data.push({
        key: index + 1,
        name: brand?.title,
        actions: (
          <>
            <Link to={`/brands/${brand?._id}`} className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(brand?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    });
    setTableData(data);
  }, [brands]);

  const showModal = (e) => {
    setOpen(true);
    setBrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteBrand = (id) => {
    dispatch(deleteBrand(id));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <h3 className="me-3 title">Brands</h3>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/brands/add")}
        >
          Add Brand
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteBrand(brandId);
        }}
        title="Are you sure you want to delete this Brand?"
      />
    </div>
  );
};

export default Brands;
