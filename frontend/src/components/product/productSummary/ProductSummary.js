"use client"

import { useEffect } from "react"
import "./ProductSummary.scss"
import { AiFillDollarCircle } from "react-icons/ai"
import { BsCart4, BsCartX } from "react-icons/bs"
import { BiCategory } from "react-icons/bi"
import InfoBox from "../../infoBox/InfoBox"
import { useDispatch, useSelector } from "react-redux"
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice"

// Icons
const productIcon = <BsCart4 size={30} color="#0078d4" />
const categoryIcon = <BiCategory size={30} color="#0078d4" />
const outOfStockIcon = <BsCartX size={30} color="#f44336" />
const earningIcon = <AiFillDollarCircle size={30} color="#4caf50" />

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch()
  const totalStoreValue = useSelector(selectTotalStoreValue)
  const outOfStock = useSelector(selectOutOfStock)
  const category = useSelector(selectCategory)

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATEGORY(products))
  }, [dispatch, products])

  return (
    <div className="product-summary">
      <h3>Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1" />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${totalStoreValue.toFixed(2)}`}
          bgColor="card2"
        />
        <InfoBox icon={outOfStockIcon} title={"Out of Stock"} count={outOfStock} bgColor="card3" />
        <InfoBox icon={categoryIcon} title={"All Categories"} count={category.length} bgColor="card4" />
      </div>
    </div>
  )
}

export default ProductSummary
