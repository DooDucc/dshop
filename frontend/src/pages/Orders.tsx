import React, { useEffect } from "react"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getOrders } from "../redux/order/actions"
import empty from "../images/empty.jpg"

const Orders = () => {
  const dispatch = useAppDispatch()

  const { orders } = useAppSelector(state => state.order)

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  return (
    <div>
      <BreadCrumb title="Orders" />
      <Container customClass="home-wrapper-2 order-wrapper py-5">
        <div className="row">
          {orders?.length === 0 && (
            <div className="col-12">
              <h3 className="text-center mb-0">
                Please buy some products 😁😁😁
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
          {orders?.length > 0 && (
            <div className="col-12">
              <div className="row">
                <table id="orders">
                  <tr>
                    <th>Order ID</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                  {orders?.map((order, index) => (
                    <tr key={index}>
                      {/* @ts-ignore */}
                      <td>{order?._id}</td>
                      {/* @ts-ignore */}
                      <td>{order?.totalPrice}</td>
                      {/* @ts-ignore */}
                      <td>{order.orderStatus}</td>
                      {/* @ts-ignore */}
                      <td>{new Date(order?.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Orders
