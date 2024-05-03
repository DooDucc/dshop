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

  const { products, brands, categories, totalPages, totalProducts } =
    useAppSelector(state => state.product)

  const [grid, setGrid] = useState(4)
  const [page, setPage] = useState(1)
  const [filterBrand, setFilterBrand] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<string | null>(null)
  const [maxPrice, setMaxPrice] = useState<string | null>(null)
  const [sort, setSort] = useState<string | null>(null)

  useEffect(() => {
    // @ts-ignore
    dispatch(getProducts({ limit: 9 }))
    dispatch(getBrands())
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    if (grid || filterBrand || filterCategory || minPrice || maxPrice || sort) {
      let limit = 10
      if (grid === 3) {
        limit = 12
      } else if (grid === 4) {
        limit = 9
      } else if (grid === 6) {
        limit = 8
      } else {
        limit = 5
      }
      dispatch(
        // @ts-ignore
        getProducts({
          page,
          limit,
          filterBrand,
          filterCategory,
          minPrice,
          maxPrice,
          sort,
        }),
      )
    }
  }, [filterBrand, filterCategory, minPrice, maxPrice, sort, grid, page])

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
                    value={minPrice || ""}
                    onChange={e => setMinPrice(e.target.value)}
                  />
                  <label htmlFor="from">From</label>
                </div>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="to"
                    value={maxPrice || ""}
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
            <div className="filter-grid mb-3">
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
            <div className="products-list pb-3">
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
            {products?.length > 5 && (
              <div className="d-flex justify-content-between">
                <div></div>
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${page === 1 ? "disabled" : ""}`}
                      onClick={page > 1 ? () => setPage(page - 1) : undefined}
                    >
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className="page-item"
                        onClick={() => setPage(index + 1)}
                      >
                        <a
                          href="#"
                          className="page-link"
                          style={{
                            backgroundColor:
                              page === index + 1 ? "#e9ecef" : "#fff",
                          }}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${page === totalPages ? "disabled" : ""}`}
                      onClick={
                        page < totalPages ? () => setPage(page + 1) : undefined
                      }
                    >
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Store
