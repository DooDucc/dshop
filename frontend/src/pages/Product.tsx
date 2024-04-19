import React, { useEffect, useState } from "react"
// @ts-ignore
import ReactStars from "react-rating-stars-component"
import { useLocation, useNavigate } from "react-router-dom"
import { BsArrowReturnRight } from "react-icons/bs"
import { FaRegHeart } from "react-icons/fa"
import { toast } from "react-toastify"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import {
  addToFavProducts,
  getProduct,
  getRatings,
  rating,
  replyRating,
} from "../redux/product/actions"
import ProductCard from "../components/ProductCard"
import { addToCart } from "../redux/cart/actions"

const Product = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const getProductId = location.pathname.split("/")[2]

  const { product, products, ratings } = useAppSelector(state => state.product)
  const { cart } = useAppSelector(state => state.cart)
  const { user } = useAppSelector(state => state.auth)

  const [quantity, setQuantity] = useState(1)
  const [isExistInCart, setIsExistInCart] = useState(false)
  const [ratingStar, setRatingStar] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [reply, setReply] = useState<string>("")
  const [openReply, setOpenReply] = useState<string>("")

  useEffect(() => {
    if (getProductId) {
      dispatch(getProduct({ id: getProductId }))
      dispatch(getRatings({ id: getProductId }))
    }
  }, [getProductId])

  useEffect(() => {
    cart?.products?.forEach(product => {
      if (product?.productDetails?._id === getProductId) {
        setIsExistInCart(true)
      }
    })
  }, [cart, getProductId])

  const handleAddToCart = () => {
    if (isExistInCart) {
      navigate("/cart")
    } else {
      if (user?.token === undefined) {
        navigate("/login")
        toast.error("Please login before add products to cart")
      } else {
        dispatch(
          addToCart(
            // @ts-ignore
            {
              body: {
                cart: { productId: getProductId, quantity },
              },
              navigate,
            },
          ),
        )
        setQuantity(1)
      }
    }
  }

  const handleReview = () => {
    if (!ratingStar) {
      toast.error("Please add rating stars")
      return
    }
    if (!comment) {
      toast.error("Please add comment")
      return
    }
    dispatch(
      rating({
        body: {
          prodId: getProductId,
          star: ratingStar,
          comment,
        },
        navigate,
      }),
    )
    setRatingStar(0)
    setComment("")
  }

  const handleAddToFavProducts = (id: string) => {
    dispatch(addToFavProducts({ id }))
  }

  const handleOpenReply = (id: string) => {
    if (id === openReply) {
      setOpenReply("")
    } else {
      setOpenReply(id)
    }
  }

  const handleSubmitReply = () => {
    if (reply) {
      dispatch(
        replyRating({
          body: { id: openReply, comment: reply },
          prodId: getProductId,
        }),
      )
      setReply("")
    }
  }

  return (
    <div>
      <Container customClass="product-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-prod-image">
              <div>
                <img src={product?.images[0]?.url} alt="" />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-prod-details">
              <div className="border-bottom">
                <h3>{product?.title}</h3>
              </div>
              <div className="border-bottom py-2">
                <h5 className="price">${product?.price}</h5>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={product?.totalRating}
                    edit={false}
                  />
                  <p className="mb-0">({product?.totalRating} reviews)</p>
                </div>
                <a href="#review">Write a Review</a>
              </div>
              <div className="py-2">
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="prod-heading">Brand:</h3>
                  <p className="prod-data mb-0">{product?.brand}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="prod-heading">Category:</h3>
                  <p className="prod-data mb-0">{product?.category}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="prod-heading">Tags:</h3>
                  <p className="prod-data mb-0">{product?.tags[0]}</p>
                </div>
                <div className="d-flex align-items-center gap-10 my-2">
                  <h3 className="prod-heading">Availability:</h3>
                  <p className="prod-data mb-0">
                    {(product?.quantity || 0) - (product?.sold || 0) > 0
                      ? "In Stock"
                      : "Unavailable"}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center mb-3">
                  {isExistInCart ? (
                    <h3 className="prod-heading">Already Added to Cart:</h3>
                  ) : (
                    <>
                      <h3 className="prod-heading">Quantity:</h3>
                      <div>
                        <input
                          type="number"
                          className="form-control"
                          style={{ width: "70px" }}
                          min={1}
                          max={10}
                          value={quantity}
                          onChange={e => setQuantity(+e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="d-flex gap-10 align-items-center">
                    <button
                      className="button border-0"
                      type="submit"
                      onClick={() => handleAddToCart()}
                    >
                      {isExistInCart ? "Go To Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-15 align-items-center">
                  <div>
                    <p
                      className="mb-0"
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleAddToFavProducts(product?._id || "")}
                    >
                      <FaRegHeart className="fs-5 me-2" />
                      Add to Favorite Products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container customClass="home-wrapper-2 desc-wrapper pb-5">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: product?.description || "" }}
              ></p>
            </div>
          </div>
        </div>
      </Container>
      {user?.token !== undefined && (
        <Container id="review" customClass="home-wrapper-2 review-wrapper">
          <div className="row">
            <div className="col-12">
              <h4 className="mb-2">Reviews</h4>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h5 className="mb-2">Average Customer Reviews</h5>
                    <div className=" d-flex gap-10 align-items-center">
                      {ratings?.totalRating && (
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          value={ratings?.totalRating}
                          edit={false}
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <a href="" className="text-dark">
                      Write a review
                    </a>
                  </div>
                </div>
                <div className="review-form py-4">
                  <h4>Write a Review</h4>
                  <form
                    onSubmit={e => {
                      e.preventDefault()
                      handleReview()
                    }}
                    action=""
                    className="d-flex flex-column gap-10"
                  >
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      value={ratingStar}
                      onChange={(e: number) => {
                        setRatingStar(e)
                      }}
                    />
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols={30}
                        rows={4}
                        placeholder="Comment"
                        onChange={e => {
                          setComment(e.target.value)
                        }}
                        value={comment || ""}
                      ></textarea>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div></div>
                      <button className="button border-0" type="submit">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-3">
                  {ratings?.data?.map((rating: any, index: number) => (
                    <div className="review" key={index}>
                      <div className="d-flex align-items-center gap-10">
                        <h6 className="mb-0">
                          {rating?.postedby?.firstName}{" "}
                          {rating?.postedby?.lastName}
                        </h6>
                        <ReactStars
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                          value={rating?.star}
                          edit={false}
                        />
                      </div>
                      <p className="mb-0">{rating?.comment}</p>
                      <div
                        className="d-flex align-items-center gap-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenReply(rating?._id)}
                      >
                        <BsArrowReturnRight style={{ color: "blue" }} />
                        <p style={{ color: "blue" }} className="mt-1 mb-0">
                          Reply
                        </p>
                      </div>
                      {openReply === rating?._id && (
                        <div className="mt-1 mb-3 px-3 py-2">
                          <div className="mb-2">
                            {rating?.subRating?.map(
                              (reply: any, index: number) => (
                                <div
                                  key={index}
                                  className="d-flex align-items-center gap-10"
                                >
                                  <h6 className="mb-0">
                                    {reply?.user?.firstName}{" "}
                                    {reply?.user?.lastName}:
                                  </h6>
                                  <p className="mb-0">{reply?.comment}</p>
                                </div>
                              ),
                            )}
                          </div>
                          <textarea
                            className="w-100 form-control"
                            cols={30}
                            rows={2}
                            placeholder="Comment"
                            onChange={e => {
                              setReply(e.target.value)
                            }}
                            value={reply || ""}
                          ></textarea>
                          <div className="d-flex align-items-center justify-content-between">
                            <div></div>
                            <button
                              className="button border-0 mt-2"
                              onClick={handleSubmitReply}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
      <Container customClass="home-wrapper-2 popular-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Popular Products</h3>
          </div>
          <div className="row">
            {products?.map(
              product =>
                product?.tags[0] === "popular" && (
                  <ProductCard key={product?._id} product={product} />
                ),
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Product
