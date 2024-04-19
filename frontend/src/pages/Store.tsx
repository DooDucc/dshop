import React, { useEffect, useState } from "react"
// @ts-ignore
import BreadCrumb from "../components/BreadCrumb"
import gr1 from "../images/gr.svg"
import gr2 from "../images/gr2.svg"
import gr3 from "../images/gr3.svg"
import gr4 from "../images/gr4.svg"
import ProductCard from "../components/ProductCard"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getBrands, getCategories, getProducts } from "../redux/product/actions"

const Store = () => {
  const dispatch = useAppDispatch()

  const { products, brands, categories } = useAppSelector(
    state => state.product,
  )

  const [grid, setGrid] = useState(4)
  const [filterBrand, setFilterBrand] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState<string | null>(null)
  const [sort, setSort] = useState<string | null>(null)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getBrands())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (filterBrand || filterCategory || minPrice || maxPrice || sort) {
      dispatch(
        // @ts-ignore
        getProducts({
          filterBrand,
          filterCategory,
          minPrice,
          maxPrice,
          sort,
        }),
      )
    }
  }, [filterBrand, filterCategory, minPrice, maxPrice, sort])

  const handleResetFilter = () => {
    setFilterBrand(null)
    setFilterCategory(null)
    setMinPrice(null)
    setMaxPrice(null)
    setSort(null)
    setGrid(4)
    dispatch(getProducts())
  }

  return (
    <div>
      <BreadCrumb title="Store" />
      <Container customClass="home-wrapper-2 store-wrapper py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Categories</h3>
              <div>
                <ul className="ps-0">
                  {categories?.map((category: any) => {
                    return (
                      <li
                        key={category?._id}
                        style={
                          filterCategory === category?.title
                            ? {
                                backgroundColor: "#777777",
                                color: "#fff",
                                borderRadius: "5px",
                                padding: "3px",
                                width: "fit-content",
                              }
                            : {}
                        }
                        // @ts-ignore
                        onClick={e => setFilterCategory(e.target.textContent)}
                      >
                        {category?.title}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop by Brands</h3>
              <div>
                <ul className="ps-0">
                  {brands?.map((brand: any) => {
                    return (
                      <li
                        key={brand?._id}
                        style={
                          filterBrand === brand?.title
                            ? {
                                backgroundColor: "#777777",
                                color: "#fff",
                                borderRadius: "5px",
                                padding: "3px",
                                width: "fit-content",
                              }
                            : {}
                        }
                        // @ts-ignore
                        onClick={e => setFilterBrand(e.target.textContent)}
                      >
                        {brand?.title}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Price</h3>
              <div className="d-flex align-items-center gap-10">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="from"
                    onChange={e => setMinPrice(e.target.value)}
                  />
                  <label htmlFor="from">From</label>
                </div>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="to"
                    onChange={e => setMaxPrice(e.target.value)}
                  />
                  <label htmlFor="to">To</label>
                </div>
              </div>
            </div>
            <button className="button w-100" onClick={handleResetFilter}>
              Reset
            </button>
          </div>
          <div className="col-9">
            <div className="filter-grid mb-4">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 " style={{ width: "100px" }}>
                    Sort By
                  </p>
                  <select
                    className="form-control form-select"
                    value={sort || ""}
                    onChange={e => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically A-Z</option>
                    <option value="-title">Alphabetically Z-A</option>
                    <option value="price">Price low to high</option>
                    <option value="-price">Price high to low</option>
                    <option value="createdAt">Date old to new</option>
                    <option value="-createdAt">Date new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">21 products</p>
                  <div className="d-flex align-items-center gap-10 grid">
                    <img
                      onClick={() => setGrid(3)}
                      src={gr4}
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => setGrid(4)}
                      src={gr3}
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => setGrid(6)}
                      src={gr2}
                      className="d-block img-fluid"
                      alt=""
                    />
                    <img
                      onClick={() => setGrid(12)}
                      src={gr1}
                      className="d-block img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {products?.map(product => (
                  <ProductCard
                    key={product?._id}
                    grid={grid}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Store
