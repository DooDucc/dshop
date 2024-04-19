// @ts-ignore
import ReactStars from "react-rating-stars-component"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/store"
import add from "../images/add-cart.svg"
import compare from "../images/prodcompare.svg"
import view from "../images/view.svg"
import fav from "../images/wish.svg"
import { Product } from "../redux/product/slice"
import { addToFavProducts } from "../redux/product/actions"

interface ProductCardProps {
  grid?: number
  product: Product
}

const ProductCard = ({ product, grid }: ProductCardProps) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const linkToProductDetails =
    location.pathname == "/"
      ? `/products/${product?._id}`
      : location.pathname == `/products/${product?._id}`
        ? `/products/${product?._id}`
        : `${product?._id}`

  const handleAddToFavProducts = (id: string) => {
    dispatch(addToFavProducts({ id }))
  }

  return (
    <div className={location.pathname === "/products" ? `gr-${grid}` : "col-3"}>
      <div
        className={`product-card position-relative ${grid === 12 ? "align-items-center" : ""}`}
      >
        <div className="fav-icon position-absolute">
          <button
            className="border-0 bg-transparent"
            onClick={() => handleAddToFavProducts(product?._id)}
          >
            <img src={fav} alt="" />
          </button>
        </div>
        <div className="product-image">
          <img
            src={product?.images[0]?.url}
            alt=""
            className="img-fluid d-block mx-auto"
          />
        </div>
        <Link to={linkToProductDetails}>
          <div className="product-details">
            <h5 className="product-title">{product?.title}</h5>
            <h4 className="brand">{product?.brand}</h4>
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={+product?.totalRating}
              edit={false}
            />
            <p
              className={`desc ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{ __html: product?.description }}
            ></p>
            <p className="price">${product?.price}</p>
          </div>
        </Link>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <button className="border-0 bg-transparent">
              <img
                src={view}
                onClick={() => navigate(linkToProductDetails)}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
