"use client"

import { useState } from "react"
import "./ProductForm.scss"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Automotive",
    "Office Supplies",
    "Toys & Games",
    "Health & Beauty",
    "Other",
  ])

  return (
    <div className="product-form-wrapper">
      <form onSubmit={saveProduct} className="product-form">
        <div className="form-sections">
          {/* Product Image Section */}
          <div className="form-section image-section">
            <h3 className="section-title">Product Image</h3>
            <div className="image-upload-area">
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Product preview" className="preview-image" />
                ) : (
                  <div className="placeholder-image">
                    {/* <span className="placeholder-icon">📷</span> */}
                    <p>No image selected</p>
                  </div>
                )}
              </div>
              <div className="upload-controls">
                <label htmlFor="product-image" className="upload-button">
                  {/* <span className="btn-icon">📁</span> */}
                  Choose Image
                </label>
                <input
                  id="product-image"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <p className="upload-hint">Supported formats: JPG, PNG, JPEG</p>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="form-section details-section">
            <h3 className="section-title">Product Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label className="field-label">
                  {/* <span className="label-icon">🏷️</span> */}
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={product?.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label className="field-label">
                  {/* <span className="label-icon">📂</span> */}
                  Category *
                </label>
                <input
                  type="text"
                  name="name"
                  value={product?.name}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-field">
                <label className="field-label">
                  {/* <span className="label-icon">💰</span> */}
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={product?.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="form-input"
                  min="0"
                  step="10"
                  required
                />
              </div>

              <div className="form-field">
                <label className="field-label">
                  {/* <span className="label-icon">📊</span> */}
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={product?.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="form-input"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-field form-field-large">
              <label className="field-label">
                {/* <span className="label-icon">📝</span> */}
                Product Description
              </label>
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    [{ color: [] }, { background: [] }],
                    ["clean"],
                  ],
                }}
                className="quill-editor"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="submit-button">
            {/* <span className="btn-icon">💾</span> */}
            Save Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
