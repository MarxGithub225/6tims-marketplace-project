import React from "react";
import { Product } from "../../sdks/product-v1/utils/DataSchemas";
import { Link } from "react-router-dom";
import { API_FILE_URL, calculatePrice } from "../../utilities/constants";
import { File } from "../../sdks/image-v1/utils/DataSchemas";
import { config } from "../../utilities/helper";
interface CardProps {
    product: Product
}
function ExpendedProductCard({product}: CardProps) {
  return <div className="sc-card-product explode style2 mg-bt sc-card-product-margin-bottom">
  <div className="card-media">
  <Link to={`/${product.slug}-${product?._id}.html`}><img src={`${API_FILE_URL}/products/${product?.images?.filter((img: File) => img._id === product.mainImage)[0].path}`} alt={`6tims - tims group | ${product.slug}`} /></Link>
{product.likes.length ?  <button className="wishlist-button heart"><span className="number-like"> {product.likes.length}</span></button>: <></>}
  </div>
  <div className="card-title">
    <h5 className="truncate w-fit"><Link to={`/${product.slug}-${product?._id}.html`}>{product.title}</Link></h5>
  </div>
  <div className="meta-info">
    <div className="author">
      <div className="avatar">
      <img src={product.seller.personnalInfo?.image ? `${API_FILE_URL}/icons/${product.seller?.personnalInfo?.image?.path}` : config.default_auth_pic} alt={`6tims - tims group | ${product.slug}`} />
      </div>
      <div className="info">
        <span>Vendeur</span>
        <h6 className="line-clamp-1"> <Link to={`/seller/${product.seller._id}`}>{product.seller.companyInfo.companyName}</Link> </h6>
      </div>
    </div>
    {calculatePrice(product).percentage > 0 && <div className="tags w-[49px] ">-{calculatePrice(product).percentage}%</div>}
  </div>
  <div className="card-bottom style-explode">
    <div className="price w-full flex flex-col items-end">
      <div className="price-details">
        <h5> {calculatePrice(product).price} DH</h5>
        {(calculatePrice(product).promo && !calculatePrice(product).isBonus) && <span className="line-through">{calculatePrice(product).oldPrice } DH</span>}
      </div>
    </div>
  </div>
</div>;
}

export default ExpendedProductCard;
