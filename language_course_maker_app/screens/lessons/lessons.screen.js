import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    View,
    Linking,
} from 'react-native';
import { 
    withNavigation,
} from 'react-navigation';

import App_Bar from "../../components/app_bar/app_bar.component";

// import Video from 'react-native-video';
// import YouTube from "react-native-youtube";

import Sound from "react-native-sound";

import { 
    Button, 
    // Card, 
    Title, 
    Paragraph,
    Text,
    ActivityIndicator,
    Surface,
} from 'react-native-paper';

import Voice from '@react-native-community/voice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// custom componetns
import Quiz_Alternatives from "./components/quiz_alternatives.component";
import Audio from "./components/audio.component";
import Video_Player from "./components/video.component";
import Speak from "./components/speak.component";

var logged_user = null;

// var _onFinishedLoadingURLSubscription = null;

class Course_Lessons extends Component {

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
            // headerTintColor: 'black',
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
            lessons_lenght: this.props.navigation.state.params.course.lessons.length,

            user_information: null,

            loading: true,

            // loadin a file (sound or video)
            loading_file: false,
            play_video: false,
            // boolean to speech 
            speaking: false,
            // user speech
            user_speech: null,
            // loading_video: false,
        };

        this.display_component = this.display_component.bind(this);
        this.store_last_current_lesson = this.store_last_current_lesson.bind(this);
        this.play_audio = this.play_audio.bind(this);
        this.handler_play_audio = this.handler_play_audio.bind(this);
        this.handler_play_video = this.handler_play_video.bind(this);
        this.hanlder_video_onLoadStart = this.hanlder_video_onLoadStart.bind(this);
        this.handler_video_onReadyForDisplay = this.handler_video_onReadyForDisplay.bind(this);

        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechResults = this.onSpeechResults;

    }

    onSpeechResults = e => {

        // update state
        this.setState({

            user_speech: e.value[0],

        });
        
        // // check if user speech is correct
        // if (this.state.lessons[this.state.current_lesson].correct_answer.toLowerCase() == e.value[0].toLowerCase()) {

        //     alert("Very good!");

        // }

        // else {

        //     alert("Ups! It is not correct, try it again")

        // }
    }

    onSpeechEnd = e => {

        // console.log(e);
        
        this.setState({
            // end: '√',
            speaking: false,
        });
    };

    onSpeechStart = e => {

        // console.log("start speaking");

        this.setState({
            // started: '√',
            speaking: true,
        });
    };

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
                
                // get user form DB
                firestore().collection("users").doc(logged_user.uid).get()
                .then( doc => {

                    if(doc.exists) {

                        var current_lesson = 0;

                        // console.log("(lessons) registerd courses: ", doc.data().registered_courses);

                        // get the current user courses
                        if (doc.data().registered_courses != null && this.props.navigation.state.params.course.course_id in doc.data().registered_courses) {

                            // console.log("(lessons) getting current lesson from user");

                            current_lesson = doc.data().registered_courses[this.props.navigation.state.params.course.course_id]["current_lesson"];
                            
                            // console.log("(lessons) current lesson: ", current_lesson);
                        };

                        // console.log("(lessons) current lesson: ", current_lesson);

                        this.setState({

                            user_information: doc.data(),
                            loading: false,
                            current_lesson: current_lesson,
                        });

                    }

                    else {

                        alert("We had a problem. Try it again!");
                        // update state
                        this.setState({
                            loading: false,
                        });

                    };

                })

                .catch(error => {

                    alert("We had a problem. Try it again!");
                    console.log("(lessons) error trying to get the user: ", error);

                    // update state
                    this.setState({
                        loading: false,
                    });

                });

            }

            else {

                alert("We had a problem. Try it again!");

                // update state
                this.setState({
                    loading: false,
                });


            }

        });

    }

    // track the last current lesson
    store_last_current_lesson(last_current_lesson) {

        console.log("(lessons) last lesson: ", last_current_lesson);

        console.log("(lessons) logged_user: ", logged_user);

        
        // if user is defined
        if (logged_user != null && this.state.lessons != null && this.state.current_lesson != null) {
            
            // const current_course = this.props.navigation.state.params.course.course_id;
            const ref = firestore().collection("users").doc(logged_user.uid);
    
            ref.get()
            .then(doc => {
                if (doc.exists){
                    
                    console.log("(lessons) user information: ", doc.data());

                    // get array of registered courses
                    var registered_courses = doc.data().registered_courses;
                    
                    // console.log("(lessons) registered courses: ", registered_courses);
                    
                    // console.log("(lessons) course id: ", this.props.navigation.state.params.course.course_id);

                    // upadte the current course current lesson
                    registered_courses[this.props.navigation.state.params.course.course_id]["current_lesson"] = last_current_lesson;
    
                    // update object
                    ref.update({
                        registered_courses: registered_courses,
                    })

                    .then(res => {
                        // console.log("(lessons) registed courses udpated");
                    })

                    .catch(e => {
                        console.log("(lessons) error trying to udpate registered courses: ", e)
                    })
    
                }
            })

            .catch(e => {
                console.log("(lessons) error trying to get users: ", e)
            })

        }
    }

    // return quiz component
    dislay_quiz(component){

        return (
            <Quiz_Alternatives component = {component} />
        )
    }

    // stop the audio
    stop_audio(url){

        // console.log("(lessons) stoping audio: ", url);

        // stop audio
        this.state.audio_to_play != null ? this.state.audio_to_play.stop() : null;

        // release sound resoure
        this.state.audio_to_play != null ? this.state.audio_to_play.release() : null;

    }

    // play audio
    play_audio(url) {
       
        this.setState({
            loading_file: true,
        });

        // play audio
        var audio_to_play = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
            
            // error
            if (error) {

                this.state.display_url_file(url, "audio", error);
                
                return;
            }

            // Play the sound with an onEnd callback
            audio_to_play.play();
            
            // update audio to play 
            this.setState({
                audio_to_play: audio_to_play,
                loading_file: false,
            });
            
        });

    }

    // handler play audio function
    handler_play_audio(audio_url) {

        const play_audio = !this.state.play_audio;
                
        
        // console.log("(lessons) playing the audio: ", audio_url);

        // update state
        this.setState({
            play_audio: play_audio,
        });
        
        // play audio function
        if (play_audio) {
            
            // this.play_audio(this.state.lessons[this.state.current_lesson].audio_url);
            this.play_audio(audio_url);
            // this.play_audio(this.state.lessons[this.state.current_lesson].components.audio_url);
        }
        
        // stop audio function
        else {
            // this.stop_audio(this.state.lessons[this.state.current_lesson].audio_url);
            this.stop_audio(audio_url);
            // this.stop_audio(this.state.lessons[this.state.current_lesson].audio_url);
        }
    }

    hanlder_video_onLoadStart(){

        this.setState({loading_file: true});

    }

    handler_video_onReadyForDisplay() {

        this.setState({loading_file: false});

    }

    // dislay url video in case of video player error
    display_url_file(url_file, resource, error) {

        console.log("Error trying to open the video: ", error);

        Alert.alert(
            'Sorry',
            'We had a problem with the ' + resource + '. Try to communicate with the teacher or try open the ' + resource + ' video in your browser',
            [
                { 
                    text: 'Play ' + resource + ' in my browser', 
                    onPress: () => {
                        Linking.openURL(url_file);   
                    }  
                },
                {
                    text: 'Ok', 
                    // onPress: () => {
                    //     Linking.openURL(url_video);     
                    // } 
                },
            ],
            { cancelable: false },
        );
        
    }

    handler_play_video() {

        this.setState({
            play_video: !this.state.play_video
        });

    }

    // display lesson
    display_component(component) {
        
        // check the lesson type
        switch(component.type) {

            // video
            case "video":
              // code block

                //   return the template
                return (

                    <Video_Player 
                        component = {component}
                        loading_file = {this.state.loading_file}
                        play_video = {this.state.play_video}
                        handler_play_video = {this.handler_play_video}
                        hanlder_video_onLoadStart = {this.hanlder_video_onLoadStart}
                        handler_video_onReadyForDisplay = {this.handler_video_onReadyForDisplay}
                        display_url_file = {this.display_url_file}
                    />
                    
                );

                break;

            // quiz
            case "quiz":

                //  return the template
                return (

                    // display quiz
                    <Surface
                        style = {{
                            flex:1,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            margin: 10,
                            // backgroundColor: "red",
                        }} 
                    >
                        {this.dislay_quiz(component)}
                    </Surface>

                );

                break;

            // quiz
            case "audio":
    
                //   return the template
                return (
    
                    <Surface
                        style = {{
                            flex:1,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            // backgroundColor: "red",
                            width: "100%",
                            margin: 5,
                            elevation: 4,
                            // padding:
                        }}
                    >
                        <Audio 
                            component = {component} 
                            loading_file = {this.state.loading_file} 
                            play_audio = {this.state.play_audio}
                            handler_play_audio = {this.handler_play_audio}
                        />
                    </Surface>
                        
                );
                
                break;

            // audio_speech
            case "speak":

                //   return the template
                return (
                    
                        
                    <Surface
                        style = {{
                            flex:3,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            margin: 5,
                            elevation: 4,
                            padding: 5,
                            // backgroundColor: "pink",
                            // width: "50%",
                        }} 
                    >

                        <Speak 
                            component = {component}
                            speaking = {this.state.speaking}
                            user_speech = {this.state.user_speech}
                        />

                    </Surface>
    
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
                        flex:1,
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'space-around',
                        // backgroundColor: "red",
                    }}
                >

                    {/* app bar */}
                    <App_Bar />
                    
                        {!this.state.loading
                        
                            ?

                                <View
                                    style = {{
                                        flex:1,
                                        flexDirection:'column',
                                        alignItems:'center',
                                        justifyContent:'space-around',
                                        // backgroundColor: "green",
                                        width: "100%",
                                    }}
                                >
                                    
                                    {/* lesson title */}
                                    <Title
                                        style = {[
                                            styles.text,
                                            {

                                            }
                                        ]}
                                    >
                                        {this.state.lessons[this.state.current_lesson].name}
                                    </Title>

                                    {/* lesson */}
                                    <View
                                        style = {{
                                            flex:4,
                                            flexDirection:'column',
                                            alignItems:'center',
                                            justifyContent:'space-around',
                                            // backgroundColor: "yellow",
                                            width: "100%",
                                        }}
                                    >

                                        {/* {this.display_component(this.state.current_lesson)} */}
                                        {this.state.lessons[this.state.current_lesson].components.map((component, index) => {
                            
                                            return (
                                                this.display_component(component)
                                            )
                                        })}

                                    </View>

                                    {/* Session controls */}
                                    <View
                                        style = {{
                                            flex:1,
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-around',
                                            // backgroundColor: "orange",
                                            width: "100%",
                                        }}
                                    >


                                        {/* previous session */}
                                        {
                                            // if there is previus session
                                            this.state.current_lesson > 0  
                                            
                                            &&

                                                <Button
                                                    
                                                    disabled = {this.state.loading_file}
                                                    
                                                    icon = "chevron-left"
                                                    mode = "contained"
                                                    // title = "Previous session"
                                                    onPress={() => {
                                                        
                                                        // update last lesson
                                                        this.store_last_current_lesson(this.state.current_lesson - 1);

                                                        // stop audio
                                                        if (this.state.play_audio) {
                                                            this.stop_audio();
                                                        };

                                                        this.setState({

                                                            // check if there is previous lesson
                                                            current_lesson: this.state.current_lesson - 1,
                                                            play_audio: false,
                                                            play_video: false,

                                                        })
                                                    }}
                                                    
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

                                                    Previous

                                                </Button>
                                        }

                                        {/* next session */}
                                        {
                                            // if there is next session
                                            !(this.state.current_lesson >= (this.state.lessons_lenght-1)) 
                                            
                                            &&

                                                <Button
                                                    disabled = {this.state.loading_file}
                                                    icon = "chevron-right"
                                                    mode = "contained"
                                                    // title = "Next session"
                                                    onPress={() => {

                                                            // update last lesson
                                                            this.store_last_current_lesson(this.state.current_lesson + 1);

                                                            // stop audio
                                                            if (this.state.play_audio) {
                                                                this.stop_audio();
                                                            };

                                                            this.setState({
                                                                
                                                                current_lesson: this.state.current_lesson + 1,
                                                                play_audio: false,
                                                                play_video: false,
                                                            })
                                                        }}

                                                >

                                                    Next

                                                </Button>
                                        }
                                        
                                        {/* Finish the course */}
                                        {   
                                            // if there is previus session
                                            this.state.current_lesson == (this.state.lessons_lenght-1)
                                            
                                            &&

                                                <Button
                                                    icon = "emoticon-happy-outline"
                                                    // title = "Finish the course"
                                                    mode = "contained"
                                                    onPress={() => {

                                                        // stop audio
                                                        if (this.state.play_audio) {
                                                            this.stop_audio();
                                                        };

                                                        this.setState({
                                                            play_audio: false,
                                                            play_video: false,
                                                        })
                                                        this.props.navigation.push("End_of_Course", {course: this.props.navigation.state.params.course});
                                                        
                                                    }}
                                                    
                                                >

                                                    Finish

                                                </Button>
                                        }

                                    </View>

                                </View>
                            :

                            <ActivityIndicator size = "large" animating={true}/>
                                    
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
        textAlign: "center"
        // fontSize: 18,
        // margin: 10,
    }
})

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Course_Lessons);