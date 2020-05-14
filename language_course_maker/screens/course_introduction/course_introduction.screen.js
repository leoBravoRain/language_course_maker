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


// fake course
const course = {
    "course_description": "Course description here",
    "course_author": "Leonardo Bravo",
    "course_name": "English from scratch to fluid",
    "lessons" : [
        {
            "name": "Learning the pronouns",
            "type": "video",
            "url_video": "https://firebasestorage.googleapis.com/v0/b/language-course-maker.appspot.com/o/4.1%20Defining%20data%20analysis%20objective.mp4?alt=media&token=d2dd8b6a-1a9c-4c60-bc97-602f2a54a85b",

        },
        {
            "name": "Lesson 2",
            "type": "quiz",
            "quiz_question": "How do you say dog in english?",
            "quiz_alternatives": [
                "Dog",
                "God",
                "Odg",
            ],
            "quiz_correct_answer": 0,
        },
        {
            "name": "Lesson 3",
            "type": "audio_transcription_quiz",
            "audio_url": "https://firebasestorage.googleapis.com/v0/b/language-course-maker.appspot.com/o/Far%20Caspian%20Best%20Of.mp3?alt=media&token=083350cf-5b2f-4f25-8581-84b0a8e09ebc",
            "audio_transcription": "This is the audio transcription",
            "quiz_question": "How do you say dog in english?",
            "quiz_alternatives": [
                "Dog",
                "God",
                "Odg",
            ],
            "quiz_correct_answer": 0,

        }
    ]
}

class Course_Introduction extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            // title: "Ingresar",
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

        this.start_course = this.start_course.bind(this);
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

    start_course() {

        // do DB request and check if course ID is correct

            // if it is correct, redirect to course
            this.props.navigation.push("Course_Lessons", {course: this.state.course});
            
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
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-around',
                    }}
                >

                        {!this.state.loading
                        
                            ?

                                <View>

                                    <Text>
                                        {this.state.course.course_name}
                                    </Text>
                                    
                                    <Text>
                                        {this.state.course.course_description}
                                    </Text>

                                    <Text>
                                        {this.state.course.course_author}
                                    </Text>

                                    <Button
                                        title = "Start the course"
                                        onPress={() => this.start_course()}
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
                                </View>
                            :

                                <ProgressBarAndroid/>
                                    
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

export default withNavigation(Course_Introduction);