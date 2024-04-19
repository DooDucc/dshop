import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../redux/product/actions";
import { resetState } from "../redux/product/slice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Sold",
    dataIndex: "sold",
    sorter: (a, b) => a.sold - b.sold,
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const { products } = useSelector((state) => state.product);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    handleCreateTableData();
  }, [products]);

  const handleCreateTableData = () => {
    const data = [];

    products?.forEach((product, index) => {
      data.push({
        key: index + 1,
        title: product?.title,
        brand: product?.brand,
        category: product?.category,
        price: `$${product?.price}`,
        quantity: `${product?.quantity}`,
        sold: `${product?.sold}`,
        actions: (
          <>
            <Link
              to={`/products/${product?._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(product?._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
    });

    setTableData(data);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  const handleSearch = (value) => {
    if (value) {
      const data = [];

      products?.forEach((product, index) => {
        if (product?.title?.toLowerCase()?.trim()?.includes(value)) {
          data.push({
            key: index + 1,
            title: product?.title,
            brand: product?.brand,
            category: product?.category,
            price: `${product?.price}`,
            actions: (
              <>
                <Link
                  to={`/products/${product?._id}`}
                  className=" fs-3 text-danger"
                >
                  <BiEdit />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                  onClick={() => showModal(product?._id)}
                >
                  <AiFillDelete />
                </button>
              </>
            ),
          });
        }
      });

      setTableData(data);
    } else {
      handleCreateTableData();
    }
  };

  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="title me-3">Products</h3>
          <Input.Search
            style={{ margin: "0 0 10px 0", width: 400 }}
            placeholder="Search by title"
            enterButton
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/products/add")}
        >
          Add Product
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          handleDeleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Products;
