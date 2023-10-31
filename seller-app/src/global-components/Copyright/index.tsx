import React, { useRef, useState } from "react";
import useOnClickOutSide from "../../utilities/onClickOutSide";
import CustomModal from "../CustomModal";

import {ReactComponent as France} from "../../assets/icons/France.svg";
import {ReactComponent as UK} from "../../assets/icons/UK.svg";
import {ReactComponent as Spain} from "../../assets/icons/Spain.svg";
import {ReactComponent as Globe} from "../../assets/icons/Globe.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface CopyrightProps {
  lng?: string
}

const  Copyright: React.FC<CopyrightProps> = ({ lng = "en" }) => {
  const page = useSelector((state: RootState) => state.header.page);
  let langRef: any = useRef();
  const [showLanguage, setShowLanguage] = useState<boolean>(false)
  useOnClickOutSide(langRef, () => setShowLanguage(false))

  const [modalOpened, setModalOpen] = useState<boolean>(false)

  const toggleModal = () => {
    setModalOpen(!modalOpened)
  }

  return <>{page !== 'not-found-page' && <div className="absolute bottom-0 left-0 w-full hidden otherWidth:flex justify-center"><div className="copyright max-width w-full flex justify-between">
    <div className="terms flex items-center space-x-4">
      <div className="terms-item" onClick={toggleModal} >Privacy Policy</div>
      <div className="terms-item" onClick={toggleModal}>Term of Use</div>
      <span>© 2021 All rights reserved</span>
    </div>

    <div className="features flex items-center space-x-4">
      <div className="relative language flex items-center space-x-2 cursor-pointer" onClick={() => setShowLanguage(!showLanguage)}>
        <Globe className='w-auto h-5' /> <span>English</span>

        {showLanguage && <div ref={langRef} className="absolute right-0 bottom-8" >
          <div className="language-drop-down shadow z-50 w-40" >
            <div className="dropdown-menu-item flex items-center justify-between"><span>English</span> <UK className='w-4 h-auto'/> </div>
            <div className="dropdown-menu-item flex items-center justify-between"><span>French</span> <France className='w-4 h-auto'/></div>
            <div className="dropdown-menu-item flex items-center justify-between"><span>Spanish</span> <Spain className='w-4 h-auto'/></div>
          </div>
        </div>}
      </div>

    </div>

    <CustomModal
      open={modalOpened}
      toggle={toggleModal}
      className="reviews-modal  overflow-y-auto no-scrollbar"
    >

      <div className="relative h-full w-full"
      >
        <div className="copyrigth-content">
          <div className="px-14 pt-10">
            <div className="copyrigth-header">Terms and conditions</div>

            <div className="mt-4">
              Lorem ipsum dolor sit amet consectetur. In magna ac enim justo condimentum sapien. Senectus morbi tellus luctus sed vulputate arcu felis. Arcu facilisis duis tristique ipsum morbi. Interdum id in sagittis justo a placerat et vivamus. Vitae eget libero tristique ligula eu nisl ullamcorper quisque. Quis sit ut vitae commodo eget pellentesque. Magna morbi massa lorem nec amet morbi. Ultrices varius imperdiet non eu pellentesque laoreet vitae sit. Habitasse quis vel gravida habitasse.

              Malesuada gravida quam vitae nisi fringilla arcu sed justo. Interdum amet pharetra orci ullamcorper quis consectetur enim. Libero cursus vivamus in porttitor vitae et. Fermentum enim id lectus amet.

              In senectus sed malesuada fermentum justo. Sed dolor habitasse erat pharetra proin mattis ornare. Proin ac ultricies aliquam cras aliquam eros purus velit.

              Access to the site
              Tempor urna dolor ultrices purus pellentesque. Blandit facilisis arcu id euismod lorem. Mi quis ullamcorper id tellus felis euismod erat ac. Leo mollis adipiscing quam est.
              Dui faucibus sed at volutpat. Curabitur scelerisque ante ultrices feugiat id at aliquam dignissim. Tempus vel vitae etiam congue ullamcorper sem morbi. Convallis duis eu purus mauris gravida nunc. Nibh diam nunc neque eget tempus. Orci nunc sit tellus integer leo. Cursus dolor lectus gravida nec aenean. Tempus placerat est integer ipsum dui purus a tempor. Amet nibh lectus elementum velit elit egestas mi gravida. Turpis integer tincidunt pellentesque eget morbi ut eget lorem.
              Amet mi natoque sed eu diam. Aliquam odio mauris tellus odio quis platea odio vitae morbi. Quam interdum a integer ut amet cursus fringilla neque. Blandit in felis arcu et consectetur. Lacus id vivamus vitae non dolor sagittis ut facilisi. Tristique curabitur eleifend eu euismod aliquam lectus convallis. Ac ac nec amet lectus erat non neque arcu faucibus. Purus ac placerat habitasse mi tempus. Ullamcorper ullamcorper proin vestibulum vulputate vitae enim praesent non. Justo ipsum lectus tristique risus tellus sollicitudin tristique odio imperdiet.

              User terms
              Ultricies gravida at adipiscing est pellentesque id. Blandit aliquet porttitor placerat sagittis pellentesque ac. Metus nisi arcu et nam gravida. Montes odio luctus odio at. Cras lorem vulputate gravida tellus.
              Urna a mauris rhoncus eu platea. Pellentesque eget placerat in risus mauris feugiat. Nulla sit sed adipiscing arcu nullam velit sed congue vitae. Nulla mattis nisi augue dui porttitor nullam. In risus tristique ac vestibulum. Dolor dui sed nibh malesuada. Aliquet tristique ornare quis mattis sed. Cras interdum lectus id sagittis laoreet venenatis sed sodales tortor. Ut neque hac faucibus ut. Lectus aliquam adipiscing adipiscing sed facilisi tortor arcu nisl.
              Dictum ornare sagittis vitae pellentesque. Viverra nullam scelerisque aliquam in ultrices eget suspendisse. Posuere ullamcorper aliquet amet feugiat adipiscing lacus mauris ultrices. Dictum tellus varius pharetra a ac enim diam tincidunt. Vitae nunc sit ipsum diam vitae cras in a viverra. Vestibulum pulvinar commodo molestie tempus sed eget lorem. Lacinia pulvinar non nibh dictum. Mollis quis cursus ornare id mi in. Blandit et nulla et blandit erat turpis mauris. Porttitor libero sed feugiat vulputate.

              User Content
              Bibendum ut morbi nibh mi nulla tincidunt orci. Sem varius velit risus feugiat. Ultricies ornare faucibus varius augue suspendisse dolor vel ultrices. Venenatis donec nisl diam maecenas tellus elit at dolor a. Egestas faucibus tempus placerat accumsan id aenean id. Amet morbi amet aliquam nisl augue iaculis. Pharetra tortor in id in est habitasse eu fusce. Sem gravida lectus nunc vulputate erat rhoncus tellus. Venenatis hendrerit at vitae suspendisse. Donec aliquet lectus viverra nascetur eu in et. Purus accumsan lorem malesuada eget. Neque vestibulum gravida sed accumsan sit et. Libero pellentesque et nullam proin dictum. At ut magnis proin porta ultrices dignissim est viverra.
              Ut quam scelerisque nec felis orci. In felis volutpat mauris turpis. Ut sed at id consectetur amet tristique. Pellentesque lectus consequat ultrices at turpis pretium. Tincidunt varius pharetra non pellentesque in venenatis enim. Sed in eu malesuada nec ut. Senectus lorem sed malesuada fusce nisi egestas. Eleifend nibh vestibulum ut nulla habitant id quisque ultrices. In morbi suscipit nec rhoncus. Phasellus risus duis urna bibendum tincidunt. Sagittis porta gravida dolor senectus laoreet dui viverra pretium gravida. Ac at nunc fermentum nunc egestas.
              Odio fames dui ac dictum egestas non. Amet risus odio arcu augue mi netus accumsan enim faucibus. Arcu lectus iaculis a iaculis libero sed dignissim. Risus sollicitudin rhoncus non et magna porta est in id. Nunc nam in sit adipiscing cras amet. Non donec mattis nec vestibulum. Pellentesque neque nisl amet condimentum id velit. Odio sit cursus nulla varius nibh sagittis aliquam massa. Nulla sed faucibus lacus metus dictum venenatis pellentesque. Varius ultricies gravida leo tincidunt vel tortor scelerisque. Faucibus at at adipiscing sed faucibus pellentesque.
              Nibh vel non condimentum massa vivamus sem. Dictum eget diam a ut sed. Ac sed enim congue volutpat. Aliquam mollis convallis nisl eget massa eget. Cursus purus blandit sed quis habitant nam et. Odio scelerisque cursus vestibulum eros dapibus dolor ut. Habitasse vitae tellus neque cursus senectus dui. Ipsum porttitor etiam faucibus facilisis cras.
              Risus metus tristique elementum vitae sollicitudin consequat orci odio. Laoreet odio nisl quis sed donec. Ut fusce porttitor odio id suspendisse tristique in integer amet. Massa quisque quis nisl velit orci id ante. Netus potenti sem in mattis enim. Vitae lobortis mattis euismod natoque sit sit elit sit malesuada. Cursus nisi vestibulum sagittis mus penatibus in leo. Pharetra faucibus eros et iaculis et ut. Ut tortor ultrices aliquet quam viverra eget sem.
              Orci dui dui tempor tortor accumsan consectetur cursus. Laoreet sit faucibus vitae tempus consectetur pellentesque semper morbi suspendisse. Cras gravida sed nisl orci porttitor. Vestibulum ultrices amet elementum velit. Cursus sodales quis nunc arcu ipsum risus morbi natoque. Odio consectetur tempor proin amet turpis egestas pharetra in. At nibh id curabitur penatibus odio tortor ut vitae et. Amet sem sed tincidunt porta tincidunt purus auctor eget felis. Volutpat erat tortor tincidunt commodo sed amet metus elementum. Id accumsan donec aenean laoreet velit malesuada feugiat. Faucibus ultricies ornare augue at purus donec lobortis at.
              Integer quis amet egestas in eu tempor. Erat purus montes quis sit nibh gravida enim tempor. Scelerisque non ac et diam. Amet dui sollicitudin sed euismod ac massa. Commodo semper tristique tellus ultricies ac mi. Scelerisque egestas malesuada massa sit suspendisse odio enim at. Id ligula at leo lectus ipsum phasellus eu. Vestibulum pharetra sed quam et. Blandit turpis phasellus praesent erat fames adipiscing nibh. Ipsum mauris maecenas nunc a velit neque. At pharetra lacus sit mi aliquam. Diam augue semper elementum consequat pharetra. At neque nunc aliquam vulputate quis nulla adipiscing. Felis nulla malesuada placerat libero.

            </div>
          </div>
        </div>

        <div className="copyright-tabs">
          <div className="px-14 pt-10">
            <div className="copyrigth-label">Table of content</div>
            <div className="mt-5">
              <ul>
                <li>Website terms of Use</li>
                <li>Access to the site</li>
                <li>User terms</li>
                <li>User Content</li>
                <li>Other Users</li>
                <li>Disclaimers</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

    </CustomModal>
  </div></div>}</>;
}

export default Copyright;
