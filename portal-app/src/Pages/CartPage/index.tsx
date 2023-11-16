import React from "react";
import PageHeader from "../../GlobalScreens/PageHeader";
import CustumButton from "../../Components/CustumButton";
import { ArrowLeft, Minus, Plus, ShoppingBag, ShoppingCart, Trash } from "react-feather";

function CartPage() {
  return <>
  <PageHeader/>

  <section className="tf-activity s1 tf-section">
  <div className="themesflat-container">
    <div className="row">
      <div className="col-lg-8 col-md-8 col-12">
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/card-item-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Monica Lucas</a></h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="status flex items-center gap-x-3">
                <span className="author">30 000 DH</span>
                <div className="flex items-center gap-x-3">
                  <Minus/>

                  <span>3</span>

                  <Plus/>
                </div>
              </div>
            </div>
          </div>
          <div className="button-active flex items-center justify-center" > 
          <Trash size={17}/>
          </div>
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Wow! That Brain is Floating</a> </h3>
              <div className="status"> <span className="quote">10 editions listed </span> by<span className="author"> Meowbids </span> for <span className="quote"> 2.50 ETH</span>each</div>
              <div className="status flex items-center gap-x-3">
                <span className="author">30 000 DH</span>
                <div className="flex items-center gap-x-3">
                  <Minus/>

                  <span>3</span>

                  <Plus/>
                </div>
              </div>
            </div>
          </div>
          <div className="button-active flex items-center justify-center" > 
          <Trash size={17}/>
          </div>
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Erotic 35mm and polaroid photography</a> </h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="status flex items-center gap-x-3">
                <span className="author">30 000 DH</span>
                <div className="flex items-center gap-x-3">
                  <Minus/>

                  <span>3</span>

                  <Plus/>
                </div>
              </div>
            </div>
          </div>
          <div className="button-active flex items-center justify-center" > 
          <Trash size={17}/>
          </div>
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Our Journey Start</a> </h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="status flex items-center gap-x-3">
                <span className="author">30 000 DH</span>
                <div className="flex items-center gap-x-3">
                  <Minus/>

                  <span>3</span>

                  <Plus/>
                </div>
              </div>
            </div>
          </div>
          <div className="button-active flex items-center justify-center" > 
          <Trash size={17}/>
          </div>
        </div>
        <div className="sc-card-activity style1">
          <div className="content">
            <div className="media">
              <img src="assets/images/box-item/image-box-10.jpg" alt="" />
            </div>
            <div className="infor">
              <h3> <a href="item-details.html">Skrrt Cobain Official</a> </h3>
              <div className="status">started following <span className="author">Gayle Hicks</span></div>
              <div className="status flex items-center gap-x-3">
                <span className="author">30 000 DH</span>
                <div className="flex items-center gap-x-3">
                  <Minus/>

                  <span>3</span>

                  <Plus/>
                </div>
              </div>
            </div>
          </div>
          <div className="button-active flex items-center justify-center" > 
          <Trash size={17}/>
          </div>
        </div>     
      </div>
      <div className="col-lg-4 col-md-4 col-12">
        <div className="order-resume w-full">
          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>
          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="price-item">
            <div className="price-item-label">
              Sous total
            </div>
            <div className="price-item-value">
              500 000 DH
            </div>
          </div>

          <div className="total-amount">
            <div className="total-amount-label">
              Total
            </div>

            <div className="total-amount-value">
              7 000 000 DH
            </div>
          </div>

          <CustumButton
          label={"Commander"}
          onclick={() => {}}
          backgroundColor="#e73a5d"
          icon={<ShoppingCart size={15}/>}
          />
          <CustumButton
          label="Faire mes achats"
          onclick={() => {}}
          backgroundColor="#fff"
          color="#f7a700"
          borderColor="#f7a700"
          icon={<ArrowLeft size={15}/>}
          />
        </div>
      </div>
    </div>
  </div>
</section>
  </>;
}

export default CartPage;
