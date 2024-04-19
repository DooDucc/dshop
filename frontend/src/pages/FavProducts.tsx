import { useEffect } from "react"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getFavProducts } from "../redux/auth/actions"
import { addToFavProducts } from "../redux/product/actions"
import close from "../images/cross.svg"
import empty from "../images/empty.jpg"

const FavProducts = () => {
  const dispatch = useAppDispatch()

  const { favProducts } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(getFavProducts())
  }, [])

  const handleDeleteFavProduct = (id: string) => {
    dispatch(addToFavProducts({ id }))
    setTimeout(() => {
      dispatch(getFavProducts())
    }, 300)
  }

  return (
    <div>
      <BreadCrumb title="Favorite Products" />
      <Container customClass="home-wrapper-2 compare-wrapper py-5">
        <div className="row">
          {favProducts?.length === 0 && (
            <div className="col-12">
              <h3 className="text-center mb-0">
                Please add some favorite products 😁😁😁
              </h3>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={empty}
                  className="image-fluid"
                  style={{ width: 400 }}
                  alt=""
                />
              </div>
            </div>
          )}
          {favProducts?.map((favProduct: any) => (
            <div key={favProduct?._id} className="col-3">
              <div className="fav-card position-relative">
                <img
                  src={close}
                  className="position-absolute cross img-fluid"
                  alt=""
                  onClick={() => handleDeleteFavProduct(favProduct?._id)}
                />
                <div className="fav-card-image">
                  <img
                    src={favProduct?.images[0].url}
                    alt=""
                    className="img-fluid w-100"
                  />
                </div>
                <div className="p-3">
                  <h5 className="title">{favProduct?.title}</h5>
                  <h5 className="price">${favProduct?.price}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default FavProducts
