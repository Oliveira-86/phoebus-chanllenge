import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Circle,
  Path,
} from "react-native-svg"
import Colors from "../../Styles/Colors"

function MoreRed(props) {
  return (
    <Svg
      data-name="Componente 1 \u2013 62"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.224}
          y1={0.072}
          x2={0.655}
          y2={0.781}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor={Colors.primaryColor} stopOpacity={0.929} />
          <Stop offset={1} stopColor="#f31504" />
        </LinearGradient>
      </Defs>
      <Circle
        data-name="Elipse 1"
        cx={12}
        cy={12}
        r={12}
        fill="url(#prefix__a)"
      />
      <Path
        data-name="mais (1)"
        d="M17.452 10.831h-4.32V6.515a.863.863 0 00-.863-.863h-.575a.863.863 0 00-.863.863v4.316H6.515a.863.863 0 00-.863.863v.575a.863.863 0 00.863.863h4.316v4.32a.863.863 0 00.863.863h.575a.863.863 0 00.863-.863v-4.32h4.32a.863.863 0 00.863-.863v-.575a.863.863 0 00-.863-.863z"
        fill="#fff"
      />
    </Svg>
  )
}

export default MoreRed