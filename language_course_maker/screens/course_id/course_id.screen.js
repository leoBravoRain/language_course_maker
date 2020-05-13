import React, { Component } from 'react';
import {
    Alert,
    // // Platform,
    StyleSheet,
    // Button,
    Text,
    View,
    // Image,
    ProgressBarAndroid,
    // FlatList,
    ImageBackground,
    // TouchableOpacity
    PermissionsAndroid,
} from 'react-native';
import {
    Input,
    Button
} from 'react-native-elements'
import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';


class Course_Id extends Component {

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
            course_id: null,
            // user_email: null,
            // password: null,
            // // user_email: "leo.bravo.rain@gmail.com",
            // // password: "123456",
            // // user_email: "1andreatapiasalinas@gmail.com",
            // // password: "123123",
            loading: false,
        };

        this.enter_course = this.enter_course.bind(this);
        // this.register = this.register.bind(this);


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
        
        
        
        // // check authentication
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
        //                     // //////console.log.log.log.log("it has token");
        //                     // alert(fcmToken);
        //                     //////console.log.log.log.log("Token: ", fcmToken);
        //                     // update token of user
        //                     firestore().collection('users').doc(user.uid).update({ 
        //                             fcm_token: fcmToken,
        //                         })       
        //                         // if ok
        //                         .then(response => {
                                    
        //                             //////console.log.log.log.log("Update user fcm token");
                                    
        //                             // navigate to home screen
        //                             this.props.navigation.push("Choose_Contact");

        //                         })
        
        //                         // if error
        //                         .catch((error) => {
        
        //                             // user message
        //                             Alert.alert(
        //                                 'Sorry!',
        //                                 'We had a problem, try to open the app again!',
        //                                 [
        //                                     { text: 'I will do it' },
        //                                 ],
        //                                 { cancelable: false },
        //                             );
        
        //                             // dislpay error in //////console.log.log.log
        //                             //////console.log.log.log.log(error);
        
        //                         });
        
        
        //                 } else {
        //                     // user doesn't have a device token yet
        //                     //////console.log.log.log.log("it has not token");
        
        //                     // // it has not token
        //                     // alert("It has not token!");
        //                     // user message
        //                     Alert.alert(
        //                         'Sorry!',
        //                         'We had a problem, try to open the app again!',
        //                         [
        //                             { text: 'I will do it' },
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

        //                 //////console.log.log.log.log("error in user authentication: ", error);
                        
        //                 // update state
        //                 this.setState({
        //                     loading: false,
        //                 });
        //             })
        //     }   
        // });
    }

    enter_course() {

        // do DB request and check if course ID is correct

            // if it is correct, redirect to course
            this.props.navigation.push("Course_Introduction");
            
    }

    // Render method
    render() {

        const url_image = "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
        // return method
        return (
            
            <ImageBackground source={{ uri: url_image }} style={{ width: '100%', height: '100%' }}>
            <View
                style = {{
                    // display: "flex",
                    // flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center'
                    flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-around',
                }}
            >

                    {!this.state.loading
                    
                    ?

                        <View>

                            <Text>
                                Enter course ID
                            </Text>
                            <Input
                                placeholder='Course ID'
                                autoCapitalize='none'
                                onChangeText={text => this.setState({ course_id: text })}
                                value={this.state.course_id}
                                containerStyle = {{
                                    // backgroundColor: "red",
                                    width: 200,
                                    // color: "white",
                                }}
                            />
                            
                            {/* 
                            <Input
                                placeholder='Password'
                                onChangeText={text => this.setState({ password: text })}
                                autoCapitalize='none'
                                value={this.state.password}
                                type = "password"
                                secureTextEntry={true}
                                containerStyle = {{
                                    // backgroundColor: "red",
                                    // width: 300,
                                }}
                            />
                            
                            */}

                            <Button
                                title = "Enter course"
                                onPress={() => this.enter_course()}
                                buttonStyle={[
                                    styles.button,
                                    {
                                        // backgroundColor: "red",
                                        // display: "flex",
                                        // flex: 1,
                                        // textAlign: "center",
                                        // height: 80,
                                        // width: 300,
                                        // width: "100%",
                                        // justifyContent: 'center',
                                    }
                                ]}
                            />
                            {/*
                            <Button
                                title="Sign-up"
                                onPress={() => this.register()}
                                buttonStyle={[
                                    styles.button,
                                    {
                                        backgroundColor: "green",
                                        // width: 200,
                                        // height: "50%",
                                        // alignSelf: "center"
                                    }
                                ]}
                            /> */}

                            {/* <Text
                                style={[styles.text], { textAlign: "center", color: "white", backgroundColor: "rgba(124, 144, 233, 0.77)", width: 200, alignSelf: "center", padding: 10, borderRadius: 40}}
                            >
                                Si quieres registrarte, solamente ingresa tu correo electrónico y alguna clave (cualquiera). Luego presiona el botón "Registrarme"
                            </Text> */}
                        </View>
                    :

                        <ProgressBarAndroid/>
                                
                    }

            </View>
                </ImageBackground>
        );

    }

}

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },  
    item: {
        // margin: 15,
        borderBottomWidth: 1,
        // padding: 20,
        borderBottomColor: "rgba(14, 20, 27, 0.21)"
        // borderBo
    },
    text: {
        fontSize: 18,
        // margin: 10,
    }
})

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Course_Id);