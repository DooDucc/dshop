import React, { useState, useEffect } from "react"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { BiSearch } from "react-icons/bi"
import { Typeahead } from "react-bootstrap-typeahead"
import wishlist from "../images/wishlist.svg"
import userIcon from "../images/user.svg"
import cartIcon from "../images/cart.svg"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getCart } from "../redux/cart/actions"
import "react-bootstrap-typeahead/css/Typeahead.css"

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { cart } = useAppSelector(state => state.cart)
  const { user } = useAppSelector(state => state.auth)
  const { products } = useAppSelector(state => state.product)

  const [searchedProducts, setSearchedProducts] = useState<
    { id: string; title: string }[]
  >([])

  useEffect(() => {
    const productOptions = products?.map(product => {
      const { _id, title } = product
      return { id: _id, title }
    })
    setSearchedProducts(productOptions)
  }, [products])

  useEffect(() => {
    if (user?.token !== undefined) {
      dispatch(getCart())
    }
  }, [user])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6">
              <p className="text-white mb-0">
                Free shipping over $100 & free returns
              </p>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <div />
                <div className="d-flex align-items-center">
                  <p className="text-end text-white mb-0 me-3">
                    Hotline:{" "}
                    <a className="text-white" href="tel:+0921394752">
                      0921394752
                    </a>
                  </p>
                  {user?.token !== undefined && (
                    <button className="button" onClick={handleLogout}>
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h1>
                <Link to="/" className="text-white">
                  Dshop.
                </Link>
              </h1>
            </div>
            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id="search-products"
                  onChange={(selected: any) => {
                    if (selected?.length > 0) {
                      navigate(`/products/${selected[0]?.id}`)
                    }
                  }}
                  options={searchedProducts}
                  paginate={true}
                  labelKey="title"
                  placeholder="Search products..."
                  minLength={2}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BiSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/fav-products"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favorite <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={user?.token ? "/profile" : "/login"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={userIcon} alt="user" />
                    {user?.token ? (
                      <p className="mb-0">
                        Welcome {user?.firstName} {user?.lastName}
                      </p>
                    ) : (
                      <p className="mb-0">
                        Login <br /> My Account
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cartIcon} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cart?.products?.length! > 0
                          ? cart?.products?.length
                          : 0}
                      </span>
                      <p className="mb-0">
                        {cart?.cartTotal! > 0 ? `$${cart?.cartTotal}` : ""}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center justify-content-center gap-30">
                <div className="menu-links">
                  <div className="d-flex align-items-center  gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    <NavLink to="/orders">Orders</NavLink>
                    <NavLink to="/feedback">Feedback</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
