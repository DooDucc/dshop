import { useEffect } from "react"
import { Link } from "react-router-dom"
import Marquee from "react-fast-marquee"
import { toast } from "react-toastify"
import mainBanner from "../images/main-banner-1.jpg"
import catbanner1 from "../images/catbanner-01.jpg"
import catbanner2 from "../images/catbanner-02.jpg"
import catbanner3 from "../images/catbanner-03.jpg"
import catbanner4 from "../images/catbanner-04.jpg"
import brand1 from "../images/brand-01.png"
import brand2 from "../images/brand-02.png"
import brand3 from "../images/brand-03.png"
import brand4 from "../images/brand-04.png"
import brand5 from "../images/brand-05.png"
import brand6 from "../images/brand-06.png"
import brand7 from "../images/brand-07.png"
import brand8 from "../images/brand-08.png"
import SpecialProduct from "../components/SpecialProduct"
import Container from "../components/Container"
import { services } from "../utils"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getProducts } from "../redux/product/actions"
import ProductCard from "../components/ProductCard"
import { getCart } from "../redux/cart/actions"

const Home = () => {
  const dispatch = useAppDispatch()

  const { products } = useAppSelector(state => state.product)
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(getProducts())
    if (user?.token !== undefined) {
      dispatch(getCart())
    }
  }, [user])

  useEffect(() => {
    if (
      window.location.href.includes("checkout=true") ||
      window.location.href.includes("vnp_Amount")
    ) {
      toast.success("Checkout successfully")
    }
  }, [])

  return (
    <>
      <Container customClass="home-wrapper-1 py-5">
        <div className="row align-items-start">
          <div className="col-6">
            <div className="main-banner position-relative p-1">
              <img
                src={mainBanner}
                alt="mainBanner"
                className="img-fluid rounded-3"
              />
              <div className="main-banner-content position-absolute">
                <h4>SPECIAL</h4>
                <h5>Ipad S13+ Pro</h5>
                <p>From $200 - $500</p>
                <Link to="/" className="button">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row flex-wrap">
              <div className="col-6">
                <div className="small-banner position-relative p-1 mb-3">
                  <img
                    src={catbanner1}
                    alt="catbanner1"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>BEST SELLER</h4>
                    <h5>Laptops Max</h5>
                    <p>From $800 - $2000</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-1">
                  <img
                    src={catbanner3}
                    alt="catbanner1"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>IPad Air</h5>
                    <p>
                      Shop the latest <br /> styles and colors
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="small-banner position-relative p-1 mb-3">
                  <img
                    src={catbanner2}
                    alt="catbanner2"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% OFF</h4>
                    <h5>Apple watch</h5>
                    <p>From $200 - $500</p>
                  </div>
                </div>
                <div className="small-banner position-relative p-1">
                  <img
                    src={catbanner4}
                    alt="catbanner2"
                    className="img-fluid rounded-3"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>FREE SHPPING</h4>
                    <h5>Headphone</h5>
                    <p>Best quality and service</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container customClass="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services.map((service, index) => (
                <div key={index} className="d-flex align-items-center gap-15">
                  <img src={service.img} alt={service.title} />
                  <div>
                    <h6>{service.title}</h6>
                    <p className="mb-0">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <Container customClass="home-wrapper-2 feature-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {products?.map(
            product =>
              product?.tags[0] === "featured" && (
                <ProductCard key={product?._id} product={product} />
              ),
          )}
        </div>
      </Container>
      <Container customClass="special-wrapper py-5 home-wrapper-">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
          <div className="row">
            {products?.map(
              product =>
                product?.tags[0] === "special" && (
                  <SpecialProduct key={product?._id} product={product} />
                ),
            )}
          </div>
        </div>
      </Container>
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
      <Container customClass="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marque-inner-wrapper card-wrapper">
              <Marquee className="d-flex ">
                <div className="mx-4 w-25">
                  <img src={brand1} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand2} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand3} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand4} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand5} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand6} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand7} alt="" />
                </div>
                <div className="mx-4 w-25">
                  <img src={brand8} alt="" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
