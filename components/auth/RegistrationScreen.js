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
import { useEffect, useState } from 'react';
import { AntDesign } from "@expo/vector-icons";

export const RegistrationScreen = () => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window').width -20 * 2)
    const [avatar, setAvatar] = useState(null);
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginFocused, setIsLoginFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);
    const [isPassShown, setIsPassShown] = useState(false);

    const handleSetLogin = text => setLogin(text);
    const handleSetEmail = text => setEmail(text);
    const handleSetPassword = text => setPassword(text);

    const hideKeyboard = () => {
        setIsKeyboardShown(false);
        Keyboard.dismiss();
    };

    useEffect(() => {
        const onChange = () => {
            const width = Dimensions.get("window").width;
            console.log("width:", width);
            setDimensions(width)
        };
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange)
        }
    }, [])

    const handleFormSubmit = () => {
        console.log(`Регистрируем пользователя ${login}, адрес электронной почты: ${email}, пароль: ${password}`);
        valueReset();
        hideKeyboard();
    };

    const valueReset = () => {
        setLogin('');
        setEmail('');
        setPassword('');
    };

    return (
        <TouchableWithoutFeedback onPress={hideKeyboard}>
            <View style={styles.container}>
                <ImageBackground
                    style={styles.background}
                    source={require("../../assets/background.jpg")}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS == 'ios' ? 'padding' : ''}
                    >
                        {/* Контейнер формы регистрации */}
                        <View style={{
                            ...styles.form,
                            paddingBottom: isKeyboardShown ? 0 : 45,
                            marginBottom: isKeyboardShown ? -120 : 0,
                            width: dimensions,
                        }}>
                            {/* Контейнер для аватарки */}
                            <View style={styles.avatar}>
                                {/* <Image /> */}
                            </View>
                            {/* Кнопка добавить / удалить аватарку */}
                            {!avatar ? (
                                <Pressable style={styles.avatarBtn} >
                                    <Text style={styles.addAvatar}>
                                        <AntDesign style={styles.antDesign} name="plus" size={20} color="#FF6C00" />
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable style={styles.avatarBtn} >
                                    <Text style={styles.delAvatar}>
                                        <AntDesign name="close" size={20} color="#BDBDBD" />
                                    </Text>
                                </Pressable>
                            )}
                            <Text style={styles.title}>Регистрация</Text>
                            {/* инпут для логина */}
                            <TextInput
                                style={{
                                    ...styles.input,
                                    backgroundColor: isLoginFocused ? '#fff' : '#E8E8E8',
                                    borderColor: isLoginFocused ? '#FF6C00' : 'transparent'
                                }}
                                placeholder='Логин'
                                placeholderTextColor='#BDBDBD'
                                onFocus={() => {
                                    setIsLoginFocused(true);
                                    setIsKeyboardShown(true);
                                }}
                                onBlur={() => { setIsLoginFocused(false) }}
                                onChangeText={text => handleSetLogin(text)}
                                value={login}
                                // textAlign={"center"}
                            />
                            {/* инпут для емейла */}
                            <TextInput
                                style={{
                                    ...styles.input,
                                    backgroundColor: isEmailFocused ? '#fff' : '#E8E8E8',
                                    borderColor: isEmailFocused ? '#FF6C00' : 'transparent'
                                }}
                                placeholder='Адрес электронной почты'
                                placeholderTextColor='#BDBDBD'
                                onFocus={() => {
                                    setIsEmailFocused(true);
                                    setIsKeyboardShown(true);
                                }}
                                onBlur={() => { setIsEmailFocused(false) }}
                                onChangeText={text => handleSetEmail(text)}
                                value={email}
                                // textAlign={"center"}
                            />
                            {/* инпут для пароля */}
                            <TextInput
                                style={{
                                    ...styles.input,
                                    backgroundColor: isPassFocused ? '#fff' : '#E8E8E8',
                                    borderColor: isPassFocused ? '#FF6C00' : 'transparent'
                                }}
                                placeholder='Пароль'
                                secureTextEntry={!isPassShown}
                                placeholderTextColor='#BDBDBD'
                                onFocus={() => {
                                    setIsPassFocused(true);
                                    setIsKeyboardShown(true);
                                }}
                                onBlur={() => { setIsPassFocused(false) }}
                                onChangeText={text => handleSetPassword(text)}
                                value={password}
                                // textAlign={"center"}
                            />
                            {/* Кнопка показать / скрыть пароль */}
                            <Pressable
                                style={styles.showPass}
                                onPress={() => { setIsPassShown(prevState => !prevState) }}
                            >
                                {isPassShown
                                    ? <Text style={styles.showPassText}>Скрыть</Text>
                                    : <Text style={styles.showPassText}>Показать</Text>
                                }   
                            </Pressable>
                            {/* Кнопка регистрации */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.button}
                                onPress={handleFormSubmit}
                            >
                                <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                            </TouchableOpacity>
                            {/* ссылка перехода на страницу логина */}
                            <Pressable style={styles.loginNav} >
                                <Text style={styles.loginNavText}>Уже есть аккаунт? Войти</Text>
                            </Pressable>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: "100vw",
        width: 420,
        backgroundColor: '#fff',        
    },
    background: {
        flex: 1,
        resizeMode: 'content',
        justifyContent:  'flex-end',
        alignItems: 'center',
    },
    form: {
        minWidth: 320,
        paddingTop: 32,
        paddingBottom: 45,
        paddingHorizontal: 16,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#fff',   
        //  ...Platform.select({
        //     ios: {
        //         backgroundColor: '#000000'
        //     },
        //     android: {
        //         backgroundColor: '#fafafa'
        //     },
        // }),
    },
    avatar: {
        marginTop: -92,
        alignSelf: 'center',
        width: 120,
        height: 120,
        backgroundColor: '#F6F6F6',
        borderRadius: 16,
    },
    avatarBtn: {
        width: 25,
        height: 25,
        alignSelf: 'center',        
        marginTop: -39,
        marginRight: -119.5,
    },
    addAvatar: {
        backgroundColor: '#fff',
        width: 25,
        height: 25,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FF6C00',
        textAlign: 'center',
        paddingTop: 2,
    },
    delAvatar: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#BDBDBD',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginBottom: 33,
        marginTop: 46,
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        fontFamily: "Roboto-Medium",
    },
    input: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#E8E8E8',
        height: 50,
        borderRadius: 8,
        color: "#212121",
        // color: "#da70d6",
        borderWidth: 1,
        borderColor: 'transparent',
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        // marginHorizontal: 10,
    },
    showPass: {
        alignSelf: 'flex-end',
        marginTop: -50,
        marginRight: 16,
    },
    showPassText: {
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        color: '#1B4371',
    },
    button: {
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        marginTop: 59,
        marginBottom: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 60,
    },
    btnTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: "Roboto-Regular",
    },
    loginNav: {
        textAlign: 'center',
    },
    loginNavText: {
        color: '#1B4371',
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        textAlign: 'center',
    }
})