import React, { Component } from 'react';
import {
    // Alert,
    // // Platform,
    // StyleSheet,
    // Button,
    // Text,
    View,
    // Image,
    // ProgressBarAndroid,
    // FlatList,
    ProgressBarAndroid,
    // Picker,
} from 'react-native';
// import {
//     Input,
//     Button,
//     // ListItem,
// } from 'react-native-elements'
import { 
    Button, 
    // Card, 
    // Title, 
    // Paragraph,
    // ActivityIndicator,
    // // Appbar,
    // Text,
} from 'react-native-paper';

import { withNavigation } from 'react-navigation';

import App_Bar from "../../components/app_bar/app_bar.component";

// import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
// import storage from '@react-native-firebase/storage';
// import ImagePicker from 'react-native-image-picker';

var logged_user = null;

class Edit_User_Profile extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            header: null,
        };
    };


    //Constructor
    constructor(props) {

        super(props);

        this.state = {
            user_name: null,
            loading: false,

        };


    }

    componentDidMount() {

        // check if user is logged
        auth().onAuthStateChanged((user) => {

            // if user is logged
            if (user) {

                // global variable
                logged_user = user;

            } else {
                // No user is signed in.

            }
        });
    }

    // Render method
    render() {

        // return method
        return (

            <View
                style={{
                    // display: "flex",
                    // flex: 1,
                    // justifyContent: 'center',
                    // alignItems: 'center'
                    flex:1,
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'space-around',
                    // flexWrap: "wrap",
                }}
            >

                {/* app bar */}
                <App_Bar/>

                {!this.state.loading

                    ?

                    <View

                        style={{
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // flex: 1,
                            // display: "flex",
                            flex:1,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            // justifyContent:'space-around',
                        }}

                    >
                        
                        {/* close session */}
                        <Button
                            icon = "close"
                            mode = "contained"
                            // title = "Close session"
                            onPress = {() => {

                                // console.log("Logout");

                                auth()
                                .signOut()
                                .then(() => {

                                    // console.log('User signed out!');
                                    this.props.navigation.push("Login");

                                });

                            }}
                            // buttonStyle = {[
                            //     styles.button,
                            //     {
                            //         backgroundColor:"red",
                            //     }]}
                        >

                            Close session

                        </Button>

                    </View>
                    :

                    <ProgressBarAndroid />

                }

            </View>
        );
    }
}


export default withNavigation(Edit_User_Profile);