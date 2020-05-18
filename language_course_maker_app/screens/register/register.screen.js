import React, { Component } from 'react';
import {
    Alert,
    // // Platform,
    StyleSheet,
    // Button,
    // Text,
    View,
    // Image,
    ProgressBarAndroid,
    // FlatList,
    ImageBackground,
    // TouchableOpacity
    // PermissionsAndroid,
    // Picker,
} from 'react-native';
// import {
//     Input,
//     Button,
//     // Picker,
// } from 'react-native-elements'

import { 
    Button, 
    // Card, 
    // Title, 
    // Paragraph,
    ActivityIndicator,
    TextInput,
    // Appbar,
    // Text,
} from 'react-native-paper';

import { withNavigation } from 'react-navigation';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// import messaging from '@react-native-firebase/messaging';
// import ImagePicker from 'react-native-image-picker';

class Register extends Component {

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
            user_name: null,
            // if user wants to read the messages in spanish
            spanish_reading_language: false,
            // if user wants to translate the writen/spoken messages he write/speak
            translate_user_input_message: true,
            // user_email: "leo.bravo.rain@gmail.com",
            // password: "123456",
            // user_email: "1andreatapiasalinas@gmail.com",
            // password: "123123",
            loading: false,

            // public profile flag
            public: true,

            profile_photo: null,

        };

        // this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount() {

        // code to fix the messages counter in group

        // const array = new Array(96).fill(0);

        // firestore().collection("groups").doc("Pg0Hx1TaatKIkoLUPqBy").update({
        //     new_messages_counter: array
        // })
        // .then(res => {
        //     console.log("updated");

        // })
        

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
        // auth().onAuthStateChanged((user) => {

        //     if (user) {
        //         // User is signed in.

        //         // update state
        //         this.setState({
        //             loading: true,
        //         });
        //         // it gets the fcmToken from the Firebase SDK,
        //         messaging().getToken()
        //             .then(fcmToken => {
        //                 if (fcmToken) {
        //                     // user has a device token
        //                     // ////console.log.log.log("it has token");
        //                     // alert(fcmToken);
        //                     ////console.log.log.log("Token: ", fcmToken);
        //                     // update token of user
        //                     firestore().collection('users').doc(user.uid).update({
        //                         fcm_token: fcmToken,
        //                     })
        //                         // if ok
        //                         .then(response => {

        //                             ////console.log.log.log("Update user fcm token");

        //                             // navigate to home screen
        //                             this.props.navigation.push("Choose_Contact");

        //                         })

        //                         // if error
        //                         .catch((error) => {

        //                             // user message
        //                             Alert.alert(
        //                                 'Ups!',
        //                                 'Tuvimos un problema, ¡Vuelve a abrir la aplicación!',
        //                                 [
        //                                     { text: 'La abriré nuevamente' },
        //                                 ],
        //                                 { cancelable: false },
        //                             );

        //                             // dislpay error in ////console.log.log
        //                             ////console.log.log.log(error);

        //                         });


        //                 } else {
        //                     // user doesn't have a device token yet
        //                     ////console.log.log.log("it has not token");

        //                     // // it has not token
        //                     // alert("It has not token!");
        //                     // user message
        //                     Alert.alert(
        //                         'Ups!',
        //                         'Tuvimos un problema, ¡Vuelve a abrir la aplicación!',
        //                         [
        //                             { text: 'La abriré nuevamente' },
        //                         ],
        //                         { cancelable: false },
        //                     );

        //                     // update state
        //                     this.setState({
        //                         loading: false,
        //                     });

        //                 }
        //             })
        //             .catch(error => {

        //                 ////console.log.log.log("error in user authentication: ", error);

        //                 // update state
        //                 this.setState({
        //                     loading: false,
        //                 });
        //             })
        //     }
        // });
    }

    // add user to demo course
    add_user_to_demo_course(user_id) {

        // demo course ID
        const demo_course_id = "Jg8WKAy7wixKvEaoED6o";

        // update user registered courses
        firestore().collection("users").doc(user_id).update({
            // demo course ID
            registered_courses: {
                Jg8WKAy7wixKvEaoED6o: {
                    current_lesson: 0,
                },
            }
        })
        .then(res => {
            console.log("(register) registered courses updated in user information");
        })
        .catch(e => {
            console.log("(register) error trying to update registered courses in user: ", e);
        });

        // add user to demo course
        firestore().collection("courses").doc(demo_course_id).update({
            registered_users: firestore.FieldValue.arrayUnion(user_id),
        })
        .then(res => {
            console.log("(register) registered users updated in course information");
        })
        .catch(e => {
            console.log("(register) error trying to update registered users in course: ", e);
        });
    }

    register() {

        // console.log("starting register");

        // validate if data is not empty
        if (!(this.state.user_email == null || this.state.password == null || this.state.user_name == null)) {

            // update state
            this.setState({
                loading: true,
            });

            // try registering in db
            // trim is for remove white space to end of email (android add it by default with stored emails)
            auth().createUserWithEmailAndPassword(this.state.user_email.trim(), this.state.password)

                .then(res => {

                    // console.log("user created on auth system");
                    
                    // get user id
                    const user_uid_ = res.user.uid;

                    
                    // new user structure
                    const new_user = {
                        email: this.state.user_email,
                        name: this.state.user_name,
                    };
                    
                    // add user to database
                    firestore().collection('users').doc(user_uid_).set(new_user)
                    
                    // if ok
                    .then(response => {
                        
                        // add new user to demo course
                        this.add_user_to_demo_course(user_uid_);

                        // navigate to Home_Student
                        this.props.navigation.push("Home_Student");

                    })

                    // if error
                    .catch((error) => {

                        console.log("error trying to create user in DB: ", error);

                        // update state
                        this.setState({
                            loading: false,
                        });

                        // user message
                        Alert.alert(
                            'Sorry!',
                            'We had a problem, try it again later!',
                            [
                                { text: 'I will do it' },
                            ],
                            { cancelable: false },
                        );

                    });
                            
                })

                // if there is any error in creating user
                .catch((error) => {

                    console.log("error trying to create user in auth system: ", error);

                    ////console.log.log.log(error);
                    // update state
                    this.setState({
                        loading: false,
                    });

                    // ////console.log.log.log("type of error: ", typeof (error));
                    // ////console.log.log.log("to string: ", error.toString());
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // ////console.log.log.log(errorCode);
                    // ////console.log.log.log(errorMessage);
                    // alert(errorMessage);
                    // if user is registered
                    if (errorCode == "auth/email-already-in-use") {
                        // Works on both iOS and Android
                        Alert.alert(
                            'User already registered',
                            'Apparently you are already registered!',
                            [
                                { text: 'I will try again' },
                            ],
                            { cancelable: false },
                        );
                    }
                    
                    // email with invalid email
                    else if (errorCode == "auth/invalid-email") {
                        // Works on both iOS and Android
                        Alert.alert(
                            'Incorrectly formatted email',
                            'The email you entered has an incorrect format',
                            [
                                { text: 'I will try again' },
                            ],
                            { cancelable: false },
                        );
                    }

                    // email with invalid email
                    else if (errorCode == "auth/weak-password") {
                        // Works on both iOS and Android
                        Alert.alert(
                            'Weak password',
                            'The password must have at least 6 characters',
                            [
                                { text: 'I will try again' },
                            ],
                            { cancelable: false },
                        );
                    }

                    // if user is not registerd
                    else {

                        // Works on both iOS and Android
                        Alert.alert(
                            errorCode,
                            errorMessage,
                            [
                                { text: 'I will try again' },
                            ],
                            { cancelable: false },
                        );
                    }

                });
        }

        else {
            // Works on both iOS and Android
            Alert.alert(
                'Missing Information',
                'It seems you have not entered all the information',
                [
                    { text: 'I will try again' },
                ],
                { cancelable: false },
            );
        }

    }

    // Render method
    render() {

        const url_image = "https://wallpaperaccess.com/full/180132.jpg";

        // return method
        return (

            <ImageBackground source={{ uri: url_image }} style={{ width: '100%', height: '100%' }}>
                <View
                    style={{
                        flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        width: "100%",
                    }}

                >

                    {!this.state.loading

                        ?

                            <View
                                style={{
                                    flex:1,
                                    flexDirection:'column',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    width: "100%",
                                }}
                            >


                                <TextInput
                                    label = 'User name'
                                    autoCapitalize='none'
                                    onChangeText={text => this.setState({ user_name: text })}
                                    value={this.state.user_name}
                                    style = {styles.item}
                                    // containerStyle={{
                                    //     // backgroundColor: "red",
                                    //     // width: 300,
                                    //     // color: "white",
                                    // }}
                                />

                                <TextInput
                                    label='Email'
                                    autoCapitalize='none'
                                    onChangeText={text => this.setState({ user_email: text })}
                                    value={this.state.user_email}
                                    style = {styles.item}
                                    // containerStyle={{
                                    //     // backgroundColor: "red",
                                    //     // width: 300,
                                    //     // color: "white",
                                    // }}
                                />

                                <TextInput
                                    label='Password'
                                    onChangeText={text => this.setState({ password: text })}
                                    autoCapitalize='none'
                                    value={this.state.password}
                                    type="password"
                                    secureTextEntry={true}
                                    style = {styles.item}
                                    // containerStyle={{
                                    //     // backgroundColor: "red",
                                    //     // width: 300,
                                    // }}
                                />

                                {/* register button */}
                                <Button
                                    mode = "contained"
                                    // title="Sign-up"
                                    onPress={() => this.register()}
                                    style = {styles.item}
                                    // buttonStyle={[
                                    //     styles.button,
                                    //     {
                                    //         backgroundColor: "blue",
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

                            <ActivityIndicator size = "large" />

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

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Register);