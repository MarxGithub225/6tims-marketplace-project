import { RootState } from "../../../../redux/store"
import React from "react"
import ContentLoader from "react-content-loader"
import { useSelector } from "react-redux"

const Loader = (props: any) => {
  const theme = useSelector((state: RootState) => state.theme.theme)

  return (
    <ContentLoader
      width={"100%"}
      height={"800"}
      backgroundColor={theme == 'light' ? "#f3f3f3" : "#2C2440"}
      foregroundColor={theme == 'light' ? "#ecebeb" : "#2C2440"}
      {...props}
    >

      <rect x="0" y="0" rx="0" ry="0" width="100%" height="1" />
      <rect x="0" y="0" rx="0" ry="0" width="1" height="800" />
      <rect x="99.9%" y="0" rx="0" ry="0" width="1" height="800" />
      <rect x="0" y="799" rx="0" ry="0" width="100%" height="1" />

      <rect x="24" y="28" rx="5" ry="5" width="188" height="40" />
      <rect x="856" y="28" rx="5" ry="5" width="155" height="40" />

      <rect x="24" y="132" rx="5" ry="5" width="34" height="8" />
      <rect x="153" y="132" rx="5" ry="5" width="32" height="8" />
      <rect x="454" y="132" rx="5" ry="5" width="70" height="8" />
      <rect x="926" y="132" rx="5" ry="5" width="38" height="8" />

      <rect x="24" y="190" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="195" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="195" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="186" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="250" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="255" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="255" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="246" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="310" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="315" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="315" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="306" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="370" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="375" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="375" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="366" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="430" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="435" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="435" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="426" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="490" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="495" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="495" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="486" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="550" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="555" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="555" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="546" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="610" rx="5" ry="5" width="20" height="20" />
      <rect x="153" y="615" rx="5" ry="5" width="135" height="4" />
      <rect x="454" y="615" rx="5" ry="5" width="400" height="4" />
      <rect x="926" y="606" rx="5" ry="5" width="84" height="36" />

      <rect x="24" y="700" rx="5" ry="5" width="109" height="40" />
      <rect x="143" y="700" rx="5" ry="5" width="40" height="40" />

      <rect x="200" y="717" rx="0" ry="0" width="9" height="4" />
      <rect x="234" y="717" rx="0" ry="0" width="9" height="4" />
      <rect x="268" y="717" rx="0" ry="0" width="9" height="4" />
      <rect x="302" y="717" rx="0" ry="0" width="9" height="4" />
      <rect x="336" y="717" rx="0" ry="0" width="9" height="4" />

      <rect x="357" y="700" rx="5" ry="5" width="109" height="40" />

      <rect x="869" y="700" rx="5" ry="5" width="130" height="40" />
    </ContentLoader>)
}

export default Loader
