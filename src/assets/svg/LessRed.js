import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
} from "react-native-svg"
import Colors from "../../Styles/Colors"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props) {
  return (
    <Svg
      width={42}
      height={42}
      viewBox="0 0 42 42"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__b"
          x1={0.067}
          y1={0.1}
          x2={0.748}
          y2={0.918}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor={Colors.primaryColor} />
          <Stop offset={1} stopColor="#f10" stopOpacity={0.929} />
        </LinearGradient>
      </Defs>
      <G data-name="Componente 18 \u2013 1">
        <G>
          <Circle
            data-name="Elipse 13"
            cx={12}
            cy={12}
            r={12}
            transform="translate(9 6)"
            fill="url(#prefix__b)"
          />
        </G>
        <Path
          data-name="Caminho 5"
          d="M15.791 16.991l10.647.07c.552 0 .808.572.808 1.124s-.256 1.107-.808 1.107H15.721c-.552 0-.949-.387-.966-1.107a1.089 1.089 0 011.036-1.194z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent