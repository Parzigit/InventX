"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser"
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice"
import { getProduct } from "../../../redux/features/product/productSlice"
import { SpinnerImg } from "../../loader/Loader"
import "./ProductDetail.scss"
import DOMPurify from "dompurify"

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [imageExpanded, setImageExpanded] = useState(false)

  const { id } = useParams()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const { product, isLoading, isError, message } = useSelector((state) => state.product)

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="status-badge status-success">In Stock</span>
    }
    return <span className="status-badge status-danger">Out Of Stock</span>
  }

  const toggleImageExpand = () => {
    setImageExpanded(!imageExpanded)
  }

  const closeExpandedImage = (e) => {
    // Close when clicking outside the image, but not when clicking the image itself
    if (e.target.classList.contains("image-overlay")) {
      setImageExpanded(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id))
    }

    if (isError) {
      console.log(message)
    }
  }, [id, isLoggedIn, isError, message, dispatch])

  return (
    <div className="product-detail-page">
      {/* Page Header 
      <div className="page-header">
        <div className="header-content">
          <div className="header-main">
            <button className="back-button" onClick={() => navigate("/dashboard")}>
              <span className="back-icon">←</span>
              Back to Dashboard
            </button>
            <h1 className="page-title">
               <span className="title-icon">📦</span> 
              Product Detail
            </h1>
             <p className="page-subtitle">Detailed information about this product</p>
          </div>    
        </div>
      </div>
      */}
      <br>
      </br>
      <div className="header-actions">
            <button className="--btn --btn-primary" onClick={() => navigate(`/edit-product/${id}`)}>
              {/* <span className="btn-icon">✏️</span> */}
              Edit Product
            </button>
          </div>
          <br>
          </br>
      <div className="product-detail-content">
        {isLoading && (
          <div className="loading-container">
            <SpinnerImg />
          </div>
        )}

        {product && (
          <div className="detail-container">
            <div className="product-image-section">
              <div className="product-image-card">
                {product?.image ? (
                  <div className="image-container">
                    <img
                      src={product.image.filePath || "/placeholder.svg"}
                      alt={product.name}
                      className="product-image"
                      onClick={toggleImageExpand}
                    />
                    <div className="image-expand-hint">
                      <span className="expand-icon">🔍</span>
                      <span className="expand-text">Click to expand</span>
                    </div>
                  </div>
                ) : (
                  <div className="no-image-placeholder">
                    <span className="no-image-icon">🖼️</span>
                    <p>No image available</p>
                  </div>
                )}
              </div>

              <div className="product-stock-status">
                <h4>Availability</h4>
                {stockStatus(product.quantity)}
              </div>
            </div>

            <div className="product-info-section">
              <div className="product-info-card">
                <div className="product-header">
                  <h2 className="product-name">{product.name}</h2>
                  <div className="product-sku">SKU: {product.sku}</div>
                </div>

                <div className="product-meta">
                  <div className="meta-item">
                    <span className="meta-label">Category</span>
                    <span className="meta-value">{product.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Price</span>
                    <span className="meta-value price-value">${product.price}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Quantity in Stock</span>
                    <span className="meta-value">{product.quantity} units</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Total Value in Stock</span>
                    <span className="meta-value price-value">${(product.price * product.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <div className="product-description">
                  <h4>Product Description</h4>
                  <div
                    className="description-content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(product.description),
                    }}
                  />
                </div>

                <div className="product-timestamps">
                  <div className="timestamp-item">
                    <span className="timestamp-label">Created</span>
                    <span className="timestamp-value">{new Date(product.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="timestamp-item">
                    <span className="timestamp-label">Last Updated</span>
                    <span className="timestamp-value">{new Date(product.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Image Overlay for expanded view */}
        {imageExpanded && product?.image && (
          <div className="image-overlay" onClick={closeExpandedImage}>
            <div className="overlay-content">
              <img src={product.image.filePath || "/placeholder.svg"} alt={product.name} className="expanded-image" />
              <button className="close-overlay" onClick={toggleImageExpand}>
                <span>✕</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
