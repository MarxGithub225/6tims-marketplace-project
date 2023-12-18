/* eslint-disable jsx-a11y/iframe-has-title */
import PageHeader from "../../PageHeader";
import { config } from '../../../utilities/helper';

function ShippingAndReturns() {
  return <>
    <PageHeader
    header="Expéditions, Livraisons et Retours"
    />
    <div className="w-full flex justify-center">
        <div className="Example__container__document" >
        <iframe id="frameID" src={config.shipping_and_returns}
            width="100%"
            height="1500px"
            />
        </div>
    </div>
  </>;
}

export default ShippingAndReturns;
