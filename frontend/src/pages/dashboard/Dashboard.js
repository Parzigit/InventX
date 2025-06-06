"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProductList from "../../components/product/productList/ProductList"
import ProductSummary from "../../components/product/productSummary/ProductSummary"
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser"
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice"
import { getProducts } from "../../redux/features/product/productSlice"
import "./Dashboard.scss"

const Dashboard = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { products, isLoading, isError, message } = useSelector((state) => state.product)

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts())
    }

    if (isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header">
        <h2>Welcome, Admin</h2>
        <button className="logout-btn">Logout</button>
      </div> */}

      <div className="dashboard-content">
        <ProductSummary products={products} />
        <div className="warehouse-section">
          <h3>Table Of Contents</h3>
          {/* <div className="search-container">
            <input type="text" placeholder="Search products" className="search-input" />
          </div> */}
          <ProductList products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
