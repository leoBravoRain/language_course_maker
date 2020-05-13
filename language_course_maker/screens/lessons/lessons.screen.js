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
    TouchableOpacity
    // PermissionsAndroid,
} from 'react-native';
import {
    // Input,
    Button
} from 'react-native-elements'
import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';

import Video from 'react-native-video';
import AudioPlayer from 'react-native-play-audio';

// fake course
const course = {
    "course_description": "Course description here",
    "course_author": "Leonardo Bravo",
    "course_name": "English from scratch to fluid",
    "lessons" : [
        {
            "name": "Learning the pronouns"
        }
    ]
}

class Course_Lessons extends Component {

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
            // lessons
            lessons: this.props.navigation.state.params.course.lessons,
            current_lesson: 0,
            // course_id: null,
            // user_email: null,
            // password: null,
            // // user_email: "leo.bravo.rain@gmail.com",
            // // password: "123456",
            // // user_email: "1andreatapiasalinas@gmail.com",
            // // password: "123123",
            loading: false,
        };

        this.display_lesson = this.display_lesson.bind(this);
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

    dislay_quiz(current_lesson){

        return (

            <View>

                <Text>
                    {current_lesson.quiz_question}
                </Text>
                
                <View
                    style = {{
                        flexWrap: "wrap",
                        flexDirection: "row",
                        // backgroundColor: "green",
                        alignSelf: "center",
                        // width: "100%",
                    }}
                >
                    {
                        current_lesson.quiz_alternatives.map((alternative, index) => {
                            
                            return (

                                // each alternative
                                <TouchableOpacity
                                    key = {index}
                                    style = {{
                                        borderWidth: 1,
                                        margin: 3,
                                        borderRadius: 50,
                                        borderColor: "gray",
                                        padding: 7,
                                    }}
                                    
                                    onPress = {() => {
                                        
                                        // check if answer is correct
                                        if (current_lesson.quiz_correct_answer == index) {
                                            alert("Very good!");
                                        }
                                        // alert(index);
                                    }}
                                    >

                                    <Text> 

                                        {alternative} 
                                        
                                    </Text>

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    play_audio(url) {
                        
        AudioPlayer.prepare(url, () => {

          AudioPlayer.play();
            
        //   AudioPlayer.getDuration((duration) => {
        //     console.log(duration);
        //   });
        //   setInterval(() => {
        //     AudioPlayer.getCurrentTime((currentTime) => {
        //       console.log(currentTime);
        //     });
        //   }, 1000);
        //   AudioPlayer.stop();
        //   AudioPlayer.pause();
        //   AudioPlayer.setCurrentTime(50.5);
        })
    }

    // display lesson
    display_lesson(current_lesson_number) {
        
        // get current lesson
        const current_lesson = this.state.lessons[current_lesson_number];
        
        console.log(current_lesson);

        // check the lesson type
        switch(current_lesson.type) {

            // video
            case "video":
              // code block

                //   return the template
                return (

                    <View>

                        <Text>
                            {current_lesson.name}
                        </Text>
                        
                        <Video 

                            source={{uri: current_lesson.url_video}}   // Can be a URL or a local file.
                            ref={(ref) => {
                                this.player = ref
                            }}                                      // Store reference
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onError={this.videoError}               // Callback when video cannot be loaded
                            controls = {true}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                width: 500,
                                height: 500,
                            }} 
                        />

                    </View>
                    
                );

                break;

            // quiz
            case "quiz":

                //   return the template
                return (

                    <View>

                        <Text>
                            {current_lesson.name}
                        </Text>

                        {/* display listen message */}
                        

                        {/* display quiz */}
                        {this.dislay_quiz(current_lesson)}

                    </View>
                    
                );

                break;

            // quiz
            case "audio_transcription_quiz":
    
    
                //   return the template
                return (
    
                    <View>
                        
                        <Text>
                            {current_lesson.name}
                        </Text>

                        {/* display audio */}
                        <Button
                            title = "Listen to audio"
                            onPress={() => {
                                this.play_audio(current_lesson.audio_url);
                            }}
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

                        <Text>
                            {current_lesson.audio_transcription}
                        </Text>
    
                        {/* display quiz */}
                        {this.dislay_quiz(current_lesson)}
    
                    </View>
                    
                );
                
                break;
          }

            
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

                                    {this.display_lesson(this.state.current_lesson)}

                                    {/* next session */}
                                    <Button
                                        title = "Next session"
                                        onPress={() => this.setState({

                                            // check if there is next lesson
                                            current_lesson: this.state.current_lesson + 1,

                                        })}

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

                                    {/* next session */}
                                    <Button
                                        title = "Previous session"
                                        onPress={() => this.setState({

                                            // check if there is previous lesson
                                            current_lesson: this.state.current_lesson - 1,

                                        })}
                                        
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

export default withNavigation(Course_Lessons);