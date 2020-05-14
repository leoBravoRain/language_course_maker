import React, { Component } from 'react';
import {
    // Alert,
    // // Platform,
    StyleSheet,
    // Button,
    // Text,
    View,
    // Image,
    // ProgressBarAndroid,
    // FlatList,
    // ImageBackground,
    // TouchableOpacity
    // PermissionsAndroid,
} from 'react-native';
// import {
//     Input,
//     Button
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
    Paragraph,
    ActivityIndicator,
} from 'react-native-paper';

class End_of_Course extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            title: "Final",
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

            // course: this.props.navigation.state.params.course,
            course: this.props.navigation.state.params.course,
            // course_id: null,
            // user_email: null,
            // password: null,
            // // user_email: "leo.bravo.rain@gmail.com",
            // // password: "123456",
            // // user_email: "1andreatapiasalinas@gmail.com",
            // // password: "123123",
            loading: false,
        };

        // this.start_course = this.start_course.bind(this);
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

    // start_course() {

    //     // do DB request and check if course ID is correct

    //         // if it is correct, redirect to course
    //         this.props.navigation.push("Course_Lessons", {course: this.state.course});
            
    // }

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
                }}
            >

                    {!this.state.loading
                    
                        ?

                            <View
                                style = {{
                                    // display: "flex",
                                    // flex: 1,
                                    // justifyContent: 'center',
                                    // alignItems: 'center'
                                    // flex:1,
                                    // flexDirection:'column',
                                    // alignItems:'center',
                                    // justifyContent:'space-around',
                                    // backgroundColor: "green",
                                    width: "100%"
                                }}
                            >

                                {/* card */}
                                <Card>

                                    <Card.Title 
                                        title = {this.state.course.course_name}
                                        subtitle = {this.state.course.course_author}
                                    />
                                    
                                    <Card.Cover 
                                        source={{ uri: this.state.course.image }} 
                                    />

                                    <Card.Content>

                                        <Paragraph
                                            style = {{
                                                textAlign: "center",
                                            }}
                                        >

                                            {this.state.course.final_course_message}
                                            
                                        </Paragraph>

                                    </Card.Content>
                                        
                                </Card>

                            </View>
                        :

                            <ActivityIndicator/>
                                
                    }

            </View>
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

export default withNavigation(End_of_Course);