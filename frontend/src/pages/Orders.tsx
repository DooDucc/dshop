import React, { useEffect } from "react"
import BreadCrumb from "../components/BreadCrumb"
import Container from "../components/Container"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { getOrders } from "../redux/order/actions"

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
        </div>
      </Container>
    </div>
  )
}

export default Orders
