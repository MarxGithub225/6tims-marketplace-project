/* eslint-disable jsx-a11y/iframe-has-title */
import PageHeader from "../../PageHeader";
import { config } from '../../../utilities/helper';

function Cookies() {
  return <>
    <PageHeader
    header="Nos cookies"
    />
    <div className="w-full flex justify-center">
        <div className="Example__container__document" >
            <iframe id="frameID" src={config.cookies}
            width="100%"
            height="1500px"
            />
        </div>
    </div>
  </>;
}

export default Cookies;
