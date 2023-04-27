import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity, 
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
// const image = {require("../assets/background.jpg")}
// import * as ScreenOrientation from "expo-screen-orientation";

const initialState = {
    email: '',
    password: '',
}



export const RegistrationScreen = () => {
    // console.log(Platform.OS);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false)
    const [state, setState] = useState(initialState)

    const [dimensions, setDimensions] = useState(
        Dimensions.get('window').width - 20*2
    )
    
    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
        console.log(state);
        setState(initialState);
    }

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width;
            console.log("width", width);
        };
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        }
    }, [])

  // const [orientation, setOrientation] = useState(null);

//   useEffect(() => {
//     checkOrientation();
//     const subscription = ScreenOrientation.addOrientationChangeListener(
//       handleOrientationChange
//     );
//     return () => {
//       ScreenOrientation.removeOrientationChangeListeners(subscription);
//     };
//   }, []);
//   const checkOrientation = async () => {
//     const orientation = await ScreenOrientation.getOrientationAsync();
//     setOrientation(orientation);
//   };
//   const handleOrientationChange = (o) => {
//     setOrientation(o.orientationInfo.orientation);
//   };
//   console.log(orientation);

    return (        
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss(),
            setIsShowKeyboard(false)
        }}>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../assets/background.jpg")}
                    style={styles.background}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : ''}
                    >
                        <View
                            style={{
                                ...styles.form,
                                marginBottom: isShowKeyboard ? 8 : 40,
                                width: dimensions,
                            }}>
                            <View style={styles.header}>
                                <Text style={styles.headerTitle}>Hello again</Text>
                                <Text style={styles.headerTitle}>Welcome back</Text>
                            </View>
                            <View>
                                <Text style={styles.inputTitle}>Email address</Text>
                                <TextInput
                                    style={styles.input}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    textAlign='center'
                                    value={state.email}
                                    onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
                                />
                            </View>
                            <View style={{marginTop: 5}}>
                                <Text style={styles.inputTitle}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    secureTextEntry={true}
                                    textAlign='center'
                                    onFocus={() => setIsShowKeyboard(true)}
                                    value={state.password}
                                    onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.btn}
                                onPress={keyboardHide}
                            >
                                <Text style={styles.btnTitle}>SIGN IN</Text>
                            </TouchableOpacity>
                            {/* <Button title='SIGN IN' /> */}
                        </View>
                    </KeyboardAvoidingView>                
                </ImageBackground>  
            </View>
        </TouchableWithoutFeedback>          
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        width: '100%',
        // alignItems: "center",
        // justifyContent: "center",
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end', 
        alignItems: 'center',
    },
    form: {        
        // marginHorizontal: 10,
        // marginBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 30,
        color: '#f0f8ff',
    },
     inputTitle: {
        color: '#fafafa',
        marginBottom: 2,
        fontSize: 18,
        fontFamily: "Roboto-Bold",
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#ffc0cb',
        // marginHorizontal: 10,
        borderRadius: 6,
        height: 40,
        // textAlign: 'center',
        // paddingLeft: 5,
    },   
    btn: {
        height: 40,
        borderRadius: 6,
        borderWidth: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        ...Platform.select({
            ios: {
                backgroundColor: 'transparent',
                borderColor: '#f0f8ff'
            },
            android: {
                backgroundColor: '#4169e1',
                borderColor: 'transparent',
            },
            default: {
                // other platforms, web for example
                backgroundColor: '#4169e1',
            }
        }),
        // backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#4169e1',
        // borderColor: Platform.OS === 'ios' ? '#f0f8ff' : 'transparent',
    },
    btnTitle: {
        color: Platform.OS === 'ios' ? '#4169e1' : '#fafafa',
        // color: '#f0f8ff',
        fontSize: 18,
    },    
})