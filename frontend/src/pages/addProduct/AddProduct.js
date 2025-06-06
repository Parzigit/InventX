"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/loader/Loader"
import ProductForm from "../../components/product/productForm/ProductForm"
import { createProduct, selectIsLoading } from "../../redux/features/product/productSlice"
import "./AddProduct.scss"

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
}

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState("")

  const isLoading = useSelector(selectIsLoading)

  const { name, category, price, quantity } = product

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase()
    const number = Date.now()
    const sku = letter + "-" + number
    return sku
  }

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("sku", generateKSKU(category))
    formData.append("category", category)
    formData.append("quantity", Number(quantity))
    formData.append("price", price)
    formData.append("description", description)
    formData.append("image", productImage)

    console.log(...formData)

    await dispatch(createProduct(formData))

    navigate("/dashboard")
  }

  return (
    <div className="add-product-page">
      {isLoading && <Loader />}

      {/* Page Header */}
      <br></br><br></br>
      {/* <div className="page-header">
        <div className="header-content">
          <div className="header-main">
            <button className="back-button" onClick={() => navigate("/dashboard")}>
              <span className="back-icon">←</span>
              Back to Dashboard
            </button>
            <h1 className="page-title">
              <span className="title-icon">📦</span>
              Add New Product
            </h1>
            <p className="page-subtitle">Add a new product to your warehouse inventory</p>
          </div>
          <div className="header-actions">
            <button className="--btn --btn-secondary" onClick={() => navigate("/dashboard")}>
              <span className="btn-icon">❌</span>
              Cancel
            </button>
          </div>
        </div>
      </div> */}

      {/* Add Product Content */}
      <div className="add-product-content">
        <div className="form-container">
          <ProductForm
            product={product}
            productImage={productImage}
            imagePreview={imagePreview}
            description={description}
            setDescription={setDescription}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            saveProduct={saveProduct}
          />
        </div>

        {/* Product Tips Sidebar */}
        <div className="tips-sidebar">
          <div className="tips-card">
            <h4 className="tips-title">
              {/* <span className="tips-icon">💡</span> */}
              Adding your product:
            </h4>
            <div className="tips-list">
              <div className="tip-item">
                {/* <span className="tip-icon">📷</span> */}
                <p>Use high-quality images for better product visibility</p>
              </div>
              <div className="tip-item">
                {/* <span className="tip-icon">🏷️</span> */}
                <p>Choose descriptive and searchable product names</p>
              </div>
              <div className="tip-item">
                {/* <span className="tip-icon">📂</span> */}
                <p>Select the most appropriate category for easy filtering</p>
              </div>
              <div className="tip-item">
                {/* <span className="tip-icon">💰</span> */}
                <p>Set competitive prices based on market research</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default AddProduct
