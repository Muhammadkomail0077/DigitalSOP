import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import COLORS from '../../../Assets/Style/Color';
import { useSelector } from 'react-redux';

function SafeArea(props) {
  const reducerData = useSelector(state => state);


  return (
    <SafeAreaView
      style={{ backgroundColor: '#EFF1FD', flex: 1 }}
    >
      {props.children}
    </SafeAreaView>
  );
}

export default SafeArea;
