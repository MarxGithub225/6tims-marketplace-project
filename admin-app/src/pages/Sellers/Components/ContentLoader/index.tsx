import { RootState } from "../../../../redux/store"
import React from "react"
import ContentLoader from "react-content-loader"
import { useSelector } from "react-redux"

const Loader = (props: any) => {
  const theme = useSelector((state: RootState) => state.theme.theme)

  return (
    <ContentLoader
      width={"100%"}
      height={"882"}
      backgroundColor={theme == 'light' ? "#f3f3f3" : "#2C2440"}
      foregroundColor={theme == 'light' ? "#ecebeb" : "#2C2440"}
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="1" />
      <rect x="0" y="0" rx="0" ry="0" width="1" height="882" />
      <rect x="99.9%" y="0" rx="0" ry="0" width="1" height="882" />
      <rect x="0" y="881" rx="0" ry="0" width="100%" height="1" />

      <rect x="24" y="28" rx="10" ry="10" width="129" height="40" />
      <rect x="159" y="28" rx="10" ry="10" width="129" height="40" />
      <rect x="294" y="28" rx="10" ry="10" width="129" height="40" />

      <rect x="24" y="77" rx="0" ry="0" width="354" height="1" />
      <rect x="24" y="77" rx="0" ry="0" width="1" height="35" />
      <rect x="378" y="77" rx="0" ry="0" width="1" height="35" />
      <rect x="24" y="112" rx="0" ry="0" width="354" height="1" />

      <rect x="32" y="83" rx="15" ry="15" width="80" height="24.81" />
      <rect x="118" y="83" rx="15" ry="15" width="80" height="24.81" />
      <rect x="204" y="83" rx="15" ry="15" width="80" height="24.81" />
      <rect x="290" y="83" rx="15" ry="15" width="80" height="24.81" />

      <rect x="856" y="28" rx="5" ry="5" width="144" height="40" />
      <rect x="24" y="134" rx="5" ry="5" width="400" height="40" />
      <rect x="572" y="134" rx="5" ry="5" width="204" height="40" />
      <rect x="800" y="134" rx="5" ry="5" width="200" height="40" />


      <rect x="24" y="244" rx="5" ry="5" width="34" height="8" />
      <rect x="262" y="244" rx="5" ry="5" width="32" height="8" />
      <rect x="507" y="244" rx="5" ry="5" width="70" height="8" />
      <rect x="752" y="244" rx="5" ry="5" width="55" height="8" />
      <rect x="938" y="244" rx="5" ry="5" width="38" height="8" />

      <rect x="24" y="307" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="307" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="307" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="307" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="298" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="367" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="367" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="367" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="367" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="358" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="427" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="427" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="427" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="427" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="418" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="487" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="487" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="487" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="487" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="478" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="547" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="547" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="547" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="547" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="538" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="607" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="607" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="607" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="607" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="598" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="667" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="667" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="667" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="667" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="658" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="727" rx="5" ry="5" width="93" height="4" />
      <rect x="262" y="727" rx="5" ry="5" width="135" height="4" />
      <rect x="507" y="727" rx="5" ry="5" width="100" height="4" />
      <rect x="752" y="727" rx="5" ry="5" width="24" height="4" />
      <rect x="916" y="718" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="797" rx="5" ry="5" width="109" height="40" />
      <rect x="143" y="797" rx="5" ry="5" width="40" height="40" />

      <rect x="200" y="814" rx="0" ry="0" width="9" height="4" />
      <rect x="234" y="814" rx="0" ry="0" width="9" height="4" />
      <rect x="268" y="814" rx="0" ry="0" width="9" height="4" />
      <rect x="302" y="814" rx="0" ry="0" width="9" height="4" />
      <rect x="336" y="814" rx="0" ry="0" width="9" height="4" />

      <rect x="357" y="797" rx="5" ry="5" width="109" height="40" />

      <rect x="869" y="797" rx="5" ry="5" width="130" height="40" />
    </ContentLoader>)
}

export default Loader
