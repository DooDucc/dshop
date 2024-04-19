import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCategory, getCategories } from "../redux/category/actions";
import { resetState } from "../redux/category/slice";
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

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);

  const [open, setOpen] = useState(false);
  const [catId, setCatId] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    const data = [];
    categories?.forEach((category, index) => {
      data.push({
        key: index + 1,
        name: category?.title,
        actions: (
          <>
            <Link
              to={`/categories/${category?._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(category?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    });
    setTableData(data);
  }, [categories]);

  const showModal = (e) => {
    setOpen(true);
    setCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <h3 className="me-3 title">Categories</h3>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/categories/add")}
        >
          Add Category
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteCategory(catId);
        }}
        title="Are you sure you want to delete this Category?"
      />
    </div>
  );
};

export default Categories;
