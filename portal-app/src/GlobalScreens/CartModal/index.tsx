import React from "react";

function CartModal() {
  return <>
  
   {/* /#page */}
      {/* Modal Popup Bid */}
      <div className="modal fade popup" id="popup_bid_success" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              <h3 className="text-center">Your Bidding
                Successfuly Added</h3>
              <p className="text-center">your bid <span className="price color-popup">(4ETH) </span> has been listing to our database</p>
              <a href="#" className="btn btn-primary"> Watch the listings</a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade popup" id="popup_bid" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div className="modal-body space-y-5 pd-40">
              <h3>Ajouter au panier</h3>
              <p className="text-center">You must bid at least <span className="price color-popup">4.89 ETH</span>
              </p>
              <input type="text" className="form-control" placeholder="00.00 ETH" />
              <p>Entrer la quantité. <span className="color-popup">5 disponibles</span>
              </p>
              <input type="text" className="form-control quantity" defaultValue={1} />
              <div className="hr" />
              <div className="d-flex justify-content-between">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#popup_bid_success" data-dismiss="modal" aria-label="Close"> Place a bid</a>
            </div>
          </div>
        </div>
      </div>
  </>;
}

export default CartModal;
