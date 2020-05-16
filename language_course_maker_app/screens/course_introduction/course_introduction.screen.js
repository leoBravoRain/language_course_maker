import React, { Component } from 'react';
import {
    Alert,
    // // Platform,
    // StyleSheet,
    // Button,
    // Text,
    View,
    Linking,
    // Image,
    // ProgressBarAndroid,
    // FlatList,
    // ImageBackground,
    // TouchableOpacity
    // PermissionsAndroid,
} from 'react-native';
// import {
//     // Input,
//     // Button,
//     // Card,
//     // Icon,
// } from 'react-native-elements'
import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';

import { 
    Button, 
    Card, 
    // Title, 
    // Text,
    Badge,
    Caption,
    Paragraph,
    ActivityIndicator,
} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";

import App_Bar from "../../components/app_bar/app_bar.component";

var logged_user = null;

class Course_Introduction extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            // title: navigation.state.params.course.course_name,
            header: null,
            // header: "Welcome",
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
            // headerTitleStyle: {
            //     // fontSize: 16,
            //     fontFamily: "Lobster-Regular"
            // },

        };
    };


    //Constructor
    constructor(props) {

        super(props);

        this.state = {
            course: this.props.navigation.state.params.course,
            // course_id: null,
            // user_email: null,
            // password: null,
            // // user_email: "leo.bravo.rain@gmail.com",
            // // password: "123456",
            // // user_email: "1andreatapiasalinas@gmail.com",
            // // password: "123123",
            loading: true,
            user_information: null,
        };

        // console.log("(course_introduction registered users: ", this.state.course.registered_users);

        this.start_course = this.start_course.bind(this);
        // this.register = this.register.bind(this);


    }
    
    componentDidMount() {

        // update state
        this.setState({
            loading: true,
        });

        // check authentication
        auth().onAuthStateChanged((user) => {

            if (user) {

                // User is signed in.
                logged_user = user;
                
                // console.log("(course introduction) logged user: ", logged_user);

                // get user from DB
                firestore().collection("users").doc(logged_user.uid).get()
                .then(doc => {

                    if(doc.exists) {

                        this.setState({
                            user_information: doc.data(),
                            loading: false,
                        })
                        
                    }
                })
                .catch(e => {

                    console.log("(course introduction) error trying to get the user: ", e);
                    
                })

            }

            // if user is not logged
            else {
                
                this.props.navigation.push("Login");

                // update state
                this.setState({
                    loading: false,
                });

            }
        });

    }

    start_course() {

        // if it is correct, redirect to course
        this.props.navigation.push("Course_Lessons", {course: this.state.course});
            
    }

    buy_course() {

        Alert.alert(
            "Buy the course",
            "We are going to redirect you to the payment section (Currently is a form in which you have to enter the payment you have to do in order to get the course)",
            [
                {
                    text: "Buy the course", 
                    onPress: () => {
                        
                        Linking.openURL(this.state.course.course_buy_link);

                    }
                },
                {
                    text: "Cancel",
                }
            ]
        )

    }

    // Render method
    render() {

        // return method
        return (
            
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
                        // backgroundColor: "yellow",
                        // width: "100%",
                    }}
                >

                    {/* app bar */}
                    <App_Bar/>

                    {/* course description */}
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
                                    // backgroundColor: "orange",
                                    width: "100%",
                                    // justifyContent:'space-around',
                                }}
                            >

                                {/* card */}
                                <Card
                                    style = {{
                                        // backgroundColor: "pink",
                                        alignSelf: "center",
                                        width: "100%",
                                        elevation: 4,
                                        // margin: 5,
                                    }}
                                >

                                    <Card.Title 
                                        title = {this.state.course.course_name}
                                        subtitle = {this.state.course.course_subtitle}
                                        // subtitle = {this.state.course.course_author}
                                    />
                                    
                                    <Card.Cover 
                                        source={{ uri: this.state.course.image }} 
                                    />

                                    <Card.Content>

                                        {/* author */}
                                        <Caption>
                                            Author: {this.state.course.course_author}
                                        </Caption>

                                        {/* course description */}
                                        <Paragraph>

                                            {this.state.course.course_description}
                                            
                                        </Paragraph>

                                        {/* course price */}
                                        <Card.Content>
                                                            
                                            <Badge
                                                style = {{
                                                    backgroundColor: "green",
                                                }}
                                            >
                                                {this.state.course.course_price != 0 ? (this.state.course.course_price + " USD") : "FREE"}
                                            </Badge>

                                        </Card.Content>

                                    </Card.Content>
                                        
                                    <Card.Actions
                                        style = {{
                                            alignSelf: "center",
                                        }}
                                    >

                                        {/* check if user is in course */}

                                        {
                                            (this.state.course.registered_users.includes(logged_user.uid)) 
                                            
                                            ? 
                                            
                                                // start course
                                                <Button
                                                    icon = "arrow-right-circle"
                                                    // buttonStyle = {{alignSelf: "center"}}
                                                    mode = "contained"
                                                    onPress={() => this.start_course()}
                                                >

                                                    {(this.state.course.course_id in this.state.user_information.registered_courses && this.state.user_information.registered_courses[this.state.course.course_id]["current_lesson"] > 0) ? "Continue the Course" : "Start the course"}

                                                </Button>

                                            :
                                                // buy course
                                                <Button
                                                    icon = "arrow-right-circle"
                                                    // buttonStyle = {{alignSelf: "center"}}
                                                    mode = "contained"
                                                    onPress={() => this.buy_course()}
                                                >

                                                    {this.state.course.course_price != 0 ? "Buy course now" : "Request course registration"}

                                                </Button>

                                        }

                                    </Card.Actions>

                                </Card>

                            </View>
                        :

                            <ActivityIndicator size = "large"/>
                                
                    }

                </View>
        );

    }

}

// const styles = StyleSheet.create({
//     button: {
//         margin: 10,
//     },  
//     item: {
//         // margin: 15,
//         borderBottomWidth: 1,
//         // padding: 20,
//         borderBottomColor: "rgba(14, 20, 27, 0.21)"
//         // borderBo
//     },
//     text: {
//         // fontSize: 15,
//         textAlign: "center",
//         // margin: 10,
//     }
// })

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Course_Introduction);