/* eslint-disable jsx-a11y/iframe-has-title */
import PageHeader from "../../PageHeader";
import { config } from '../../../utilities/helper';
import htmlContent from '../../../assets/docs/cookies.html'
function Cookies() {
  return <>
    <PageHeader
    header="Nos cookies"
    />
    <div className="w-full flex justify-center">
      <div dangerouslySetInnerHTML={ {__html: htmlContent} } />
    </div>
  </>;
}

export default Cookies;
