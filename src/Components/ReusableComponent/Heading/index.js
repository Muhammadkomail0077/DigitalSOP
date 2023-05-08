import React, {useState} from 'react';
import {Headline} from 'react-native-paper';
// import FONT from '../../Assets/Style/Font';
import COLORS from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';

function Heading(props) {
  const reducerData = useSelector(state => state);
  const [isdark, setisDark] = useState(reducerData?.isDark?.isdark);

  const {
    Stylefont,
    Fontweight,
    Fontsize,
    txtAlign,
    ml,
    mt,
    p,
    lh,
    Heading,
    mx,
    ac,
    ai,
    as,
    bc,
    c
  } = props;

  return (
    <Headline
      style={{
        // fontFamily: FONT.pop,
        fontStyle: Stylefont,
        fontWeight: Fontweight,
        fontSize: Fontsize,
        textAlign: txtAlign,
        alignContent:ac,
        alignItems:ai,
        alignSelf:as,
        backgroundColor:bc,
        marginLeft: ml,
        marginHorizontal: mx,
        marginTop: mt,
        padding: p,
        lineHeight: lh,
        color: c,
      }}>
      {Heading}
    </Headline>
  );
}

export default Heading;
