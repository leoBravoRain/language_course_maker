import React, { Component } from 'react';
import {
    Alert,
    // // Platform,
    StyleSheet,
    // Button,
    // Text,
    View,
    // Image,
    // ProgressBarAndroid,
    // FlatList,
    ImageBackground,
    // TouchableOpacity
    PermissionsAndroid,
} from 'react-native';
// import {
//     Input,
//     Button
// } from 'react-native-elements';

import { 
    Button, 
    // Card, 
    Title, 
    // Paragraph,
    ActivityIndicator,
    TextInput,
    // Appbar,
    // Text,
} from 'react-native-paper';

import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';

import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import messaging from '@react-native-firebase/messaging';


async function request_record_permission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Permission to record audio',
                message:
                    'In order to practice speaking, you have to use the microphone',
                buttonNegative: 'Cancel',
                buttonPositive: 'Ok',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //////console.log.log.log.log('You can use the camera');
        } else {
            //////console.log.log.log.log('Camera permission denied');

            // Works on both iOS and Android
            Alert.alert(
                'Sorry',
                'You can not use the microphone to practice your speaking skills',
                [
                    { text: 'Ok' },
                ],
                { cancelable: false },
            );

        }
    } catch (err) {
        //////console.log.log.log.warn(err);
    }
}

request_record_permission();

class Login extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            // title: "Ingresar",
            header: null,
            //   headerLeft: null,
            // headerLeft: <Image 
            //       source={require('../assets/images/JEYBLANCO.png')} 
            //       style = {{width: 50, height: 50}}
            //     />,
            // headerStyle: {
            //   backgroundColor: "#9669AA",
            //   fontWeight: 20,
            // },
            headerTintColor: 'black',
            //   headerTitleStyle: {
            //     fontSize: 30,
            //     fontFamily: "Lobster-Regular"
            //   },

        };
    };


    //Constructor
    constructor(props) {

        super(props);

        this.state = {
            user_email: null,
            password: null,
            // user_email: "leo.bravo.rain@gmail.com",
            // password: "123456",
            // user_email: "1andreatapiasalinas@gmail.com",
            // password: "123123",
            loading: false,
        };

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);


    }
    
    componentDidMount() {

        // // check notifications permmissions
        // messaging().hasPermission()
        //     .then(enabled => {
        //         if (enabled) {
        //             alert('Yes')
        //         } else {
        //             alert('No')
        //         }
        //     });
        
        
        
        // check authentication
        auth().onAuthStateChanged((user) => {

            if (user) {
                // User is signed in.

                // update state
                this.setState({
                    loading: true,
                });

                // navigate to user home screen
                this.props.navigation.push("Home_Student");

                // // it gets the fcmToken from the Firebase SDK,
                // messaging().getToken()
                //     .then(fcmToken => {
                //         if (fcmToken) {
                //             // user has a device token
                //             // //////console.log.log.log.log("it has token");
                //             // alert(fcmToken);
                //             //////console.log.log.log.log("Token: ", fcmToken);
                //             // update token of user
                //             firestore().collection('users').doc(user.uid).update({ 
                //                     fcm_token: fcmToken,
                //                 })       
                //                 // if ok
                //                 .then(response => {
                                    
                //                     //////console.log.log.log.log("Update user fcm token");
                                    
                //                     // navigate to home screen
                //                     this.props.navigation.push("Choose_Contact");

                //                 })
        
                //                 // if error
                //                 .catch((error) => {
        
                //                     // user message
                //                     Alert.alert(
                //                         'Sorry!',
                //                         'We had a problem, try to open the app again!',
                //                         [
                //                             { text: 'I will do it' },
                //                         ],
                //                         { cancelable: false },
                //                     );
        
                //                     // dislpay error in //////console.log.log.log
                //                     //////console.log.log.log.log(error);
        
                //                 });
        
        
                //         } else {
                //             // user doesn't have a device token yet
                //             //////console.log.log.log.log("it has not token");
        
                //             // // it has not token
                //             // alert("It has not token!");
                //             // user message
                //             Alert.alert(
                //                 'Sorry!',
                //                 'We had a problem, try to open the app again!',
                //                 [
                //                     { text: 'I will do it' },
                //                 ],
                //                 { cancelable: false },
                //             );

                //             // update state
                //             this.setState({
                //                 loading: false,
                //             });

                //         }
                //     })
                //     .catch(error => {

                //         //////console.log.log.log.log("error in user authentication: ", error);
                        
                //         // update state
                //         this.setState({
                //             loading: false,
                //         });
                //     })
            }   
        });
    }

    login() {

        //////console.log.log.log.log("login");
        
        // validate if data is not empty
        if (this.validate_data_is_not_empty()) {

            this.setState({
                loading: true,
            });
            
            // //////console.log.log.log.log(this);
            auth().signInWithEmailAndPassword(this.state.user_email.trim(), this.state.password)
            
            .then(res => {
                
                //////console.log.log.log.log("user logged!");

                // update state
                this.setState({
                    loading: false,
                });

                // navigate to home screen
                this.props.navigation.push("Home_Student");
                
                
            })
            
            .catch((error) => {
                
                // update state
                this.setState({
                    loading: false,
                });

                // Works on both iOS and Android
                Alert.alert(
                    'Ups!',
                    'The email or password appears to be incorrect. Please try again.',
                    [
                        { text: 'I will try again'},
                    ],
                    { cancelable: false },
                );


                    
            });
                
        }

        else {
            // Works on both iOS and Android
            Alert.alert(
                'Information is missing',
                'It seems you have not entered all the information',
                [
                    { text: 'I will try again', onPress: () => {}},
                ],
                { cancelable: false },
            );
        }
                        
        }
        
       
    register() {

        //////console.log.log.log.log("register");

        this.props.navigation.push("Register");

    }

    validate_data_is_not_empty() {
        if (this.state.user_email == null || this.state.password == null) {
            return false;
        }
        return true;
    }

    // Render method
    render() {

        const url_image = "https://wallpaperaccess.com/full/180132.jpg";
        // return method
        return (
            
            <ImageBackground 
                source={{ uri: url_image }} 
                style={{ 
                    width: '100%', 
                    height: '100%',
                }}
            >

                <View
                    style = {{
                        // display: "flex",
                        // flex: 1,
                        // justifyContent: 'center',
                        // alignItems: 'center'
                        flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'space-around',
                        // backgroundColor: "red",
                        width: "100%",

                    }}
                >

                        {!this.state.loading
                        
                        ?

                            <View
                                style = {{
                                    flex:1,
                                    flexDirection:'column',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    // backgroundColor: "orange",
                                    width: "100%",
                                }}
                            >
                                {/* title */}
                                <Title
                                >
                                    Language courses
                                </Title>


                                {/* input email  */}
                                <TextInput
                                    label = 'Email'
                                    autoCapitalize='none'
                                    onChangeText={text => this.setState({ user_email: text })}
                                    value={this.state.user_email}
                                    style = {styles.item}
                                    // containerStyle = {{
                                    //     // backgroundColor: "red",
                                    //     width: 200,
                                    //     // color: "white",
                                    // }}
                                />

                                <TextInput
                                    label ='Password'
                                    onChangeText={text => this.setState({ password: text })}
                                    autoCapitalize='none'
                                    value={this.state.password}
                                    type = "password"
                                    secureTextEntry={true}
                                    style = {styles.item}
                                    // containerStyle = {{
                                    //     // backgroundColor: "red",
                                    //     // width: 300,
                                    // }}
                                />
                                

                                <Button
                                    mode = "contained"
                                    // title = "Login"
                                    onPress={() => this.login()}
                                    style = {styles.item}
                                    // buttonStyle={[
                                    //     styles.button,
                                    //     {
                                    //         // backgroundColor: "red",
                                    //         // display: "flex",
                                    //         // flex: 1,
                                    //         // textAlign: "center",
                                    //         // height: 80,
                                    //         // width: 300,
                                    //         // width: "100%",
                                    //         // justifyContent: 'center',
                                    //     }
                                    // ]}
                                >
                                    Login

                                </Button>

                                <Button
                                    mode = "contained"
                                    // title="Sign-up"
                                    onPress={() => this.register()}
                                    style = {styles.item}
                                    // buttonStyle={[
                                    //     styles.button,
                                    //     {
                                    //         backgroundColor: "green",
                                    //         // width: 200,
                                    //         // height: "50%",
                                    //         // alignSelf: "center"
                                    //     }
                                    // ]}
                                >
                                    Sign-up

                                </Button>

                            </View>
                        :

                            <ActivityIndicator size = "large"/>
                                    
                        }

                </View>
            </ImageBackground>
        );

    }

}

const styles = StyleSheet.create({
    item: {
        width: "80%",
        margin: 3,

    }
})

export default withNavigation(Login);