import React, { useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import SafeArea from '../Safearea';

export default function BottomSheet(props) {

    return (
        <SafeArea>
            <RBSheet
                ref={props.refRBSheets}
                closeOnDragDown={false}
                closeOnPressMask={false}
                height={props.height}
                animationType={'slide'}
                customStyles={{
                    draggableIcon: {
                        backgroundColor: '#D0D2DE',
                    },
                    container: {
                        backgroundColor: '#EFF1FD',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        alignSelf: 'center',
                        // marginBottom:50
                    },
                    wrapper: {
                        // zIndex: -500,
                        // position: 'relative',
                    }
                }}>
                {props.children}
            </RBSheet>
            {/* </ScrollView> */}
        </SafeArea>
    );
}
