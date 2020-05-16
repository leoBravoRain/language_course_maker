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

import Video from 'react-native-video';
import YouTube from "react-native-youtube";

import AudioPlayer from 'react-native-play-audio';

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


var logged_user = null;

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
            play_video: false,
            // boolean to speech 
            speaking: false,
            // user speech
            user_speech: null,
            // loading_video: false,
        };

        this.display_lesson = this.display_lesson.bind(this);
        this.store_last_current_lesson = this.store_last_current_lesson.bind(this);

        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechResults = this.onSpeechResults;


    }

    onSpeechResults = e => {

        // update state
        this.setState({

            user_speech: e.value[0],

        });
        
        // check if user speech is correct
        if (this.state.lessons[this.state.current_lesson].correct_answer.toLowerCase() == e.value[0].toLowerCase()) {

            alert("Very good!");

        }

        else {

            alert("Ups! It is not correct, try it again")

        }
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

        // console.log("(lessons) last lesson: ", last_current_lesson);

        // console.log("(lessons) obj: ", this.props.navigation.state.params.course.course_id);

        // if user is defined
        if (logged_user != null && this.state.lessons != null && this.state.current_lesson != null) {

            // const current_course = this.props.navigation.state.params.course.course_id;
            const ref = firestore().collection("users").doc(logged_user.uid);
    
            ref.get()
            .then(doc => {
                if (doc.exists){
    
                    // get array of registered courses
                    var registered_courses = doc.data().registered_courses;
    
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
    dislay_quiz(current_lesson){

        return (

            <View
                style = {{
                    flex:1,
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'space-around',
                    // backgroundColor: "yellow",
                    width: "100%",
                }}
            >

                <Paragraph
                    style = {[
                        styles.text,
                        // {
                        //     // color: "red",
                        // }
                    ]}
                >
                    {current_lesson.quiz_question}
                </Paragraph>
                
                <View
                    style = {{
                        flexWrap: "wrap",
                        flexDirection: "column",
                        // backgroundColor: "green",
                        alignSelf: "center",
                        // width: "100%",
                    }}
                >
                    {
                        current_lesson.quiz_alternatives.map((alternative, index) => {
                            
                            return (

                                <Button
                                    key = {index}
                                    mode = "outlined"
                                    onPress = {() => {
                                            
                                        // check if answer is correct
                                        if (current_lesson.quiz_correct_answer == index) {
                                            alert("Very good!");
                                        }
                                        else {
                                            alert("Ups, It is incorrect!")
                                        }
                                    }}
                                    style = {{
                                        // backgroundColor: "red",
                                        margin: 5,
                                    }}
                                >
                                    {alternative} 
                                </Button>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    stop_audio(url){

        // console.log("stop audio");

        AudioPlayer.stop();

    }

    play_audio(url) {
                
        AudioPlayer.prepare(url, () => {

            console.log("play audio");
            AudioPlayer.play();
            
        })

    }

    // dislpay seccion of audio
    display_audio(current_lesson) {

        return (

            <View
                style = {{
                    flex:1,
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'space-around',
                    // backgroundColor: "yellow",
                    width: "100%",
                }}

            >
                <Text>
                    Listen to the audio and then answer the question
                </Text>

                {/* display audio options */}
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

                    {/* play audio */}
                    <Button

                        icon = {!this.state.play_audio ? "play-circle-outline" : "stop"}
                        
                        // title = "Listen the audio"
                        onPress={() => {

                            const play_audio = !this.state.play_audio;

                            
                            if (play_audio) {
                                
                                this.play_audio(current_lesson.audio_url);
                            }
                            
                            else {
                                this.stop_audio(current_lesson.audio_url);
                            }
                            
                            // update state
                            this.setState({
                                play_audio: play_audio,
                            })
                        }}

                        mode = "contained"
                    >

                        {!this.state.play_audio ? "Listen audio" : "Stop audio"}

                    </Button>

                </View>
                
                {/* audio transcription */}
                <Text
                    style = {[
                        styles.text,
                        {
                            flex: 1,
                        }
                    ]}
                >
                    {current_lesson.audio_transcription}
                </Text>

            </View>
            
        )

    }

    // get youtube video ID
    youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    // dislay url video in case of video player error
    display_url_video(url_video, error) {

        console.log("Error trying to open the video: ", error);

        Alert.alert(
            'Sorry',
            'We had a problem with the video. Try to communicate with the teacher or try open the video in your browser',
            [
                { 
                    text: 'Watch video in my browser', 
                    onPress: () => {
                        Linking.openURL(url_video);   
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

    // display lesson
    display_lesson(current_lesson_number) {
        
        // get current lesson
        const current_lesson = this.state.lessons[current_lesson_number];

        // check the lesson type
        switch(current_lesson.type) {

            // video
            case "video":
              // code block

                //   return the template
                return (

                    <View
                        style = {{
                            flex:1,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            // backgroundColor: "yellow",
                            width: "100%",
                        }}
                    >

                        {/* play video (to avoid do request) */}
                        <Button
                            icon = {!this.state.play_video ? "play-circle-outline" : "stop"}
                            mode = "contained"
                            onPress = {() => {
                                this.setState({
                                    play_video: !this.state.play_video
                                });
                            }}
                        >
                            {!this.state.play_video ? "Play video" : "Stop video"}
                        </Button>


                        {/* video player */}
                        <View
                            style = {{
                                flex:1,
                                flexDirection:'column',
                                alignItems:'center',
                                justifyContent:'space-around',
                                // backgroundColor: "yellow",
                                width: "100%",
                            }}
                        >

                            {
                                this.state.play_video 

                                    ?

                                    // check if video is from Youtube
                                    current_lesson.url_video.includes("youtu.be") 

                                        ?

                                            // youtube video

                                            <YouTube
                                                apiKey = "AIzaSyD4R_XBEG1kwMvlmLoMQhckhKqGyNqKAYg"
                                                videoId = {this.youtube_parser(current_lesson.url_video)} // The YouTube video ID
                                                play // control playback of video with true/false
                                                fullscreen = {false} // control whether the video should play in fullscreen or inline
                                                loop = {false} // control whether the video should loop when ended
                                                // onReady = {e => this.setState({ isReady: true })}
                                                // onChangeState={e => this.setState({ status: e.state })}
                                                // onChangeQuality={e => this.setState({ quality: e.quality })}
                                                onError={error => this.display_url_video(current_lesson.url_video, error)}
                                                style={{
                                                    // position: 'absolute',
                                                    // top: 0,
                                                    // left: 0,
                                                    // bottom: 0,
                                                    // right: 0,
                                                    width: "100%",
                                                    height: "80%",
                                                }} 
                                            />

                                        :

                                            <Video 
                                                // onLoadStart = {() => {
                                                //     console.log("loading");
                                                //     this.setState({loading_video: true})
                                                // }}
                                                // onReadyForDisplay = {() => {
                                                //     console.log("ready");
                                                //     this.setState({loading_video: false})}
                                                // }
                                                source={{uri: current_lesson.url_video}}   // Can be a URL or a local file.
                                                // ref={(ref) => {
                                                //     this.player = ref
                                                // }}                                      // Store reference
                                                // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                                onError = {(error) => {
                                                    // console.log("error trying to load the video: ", error);
                                                    // alert("Sorry. We had a problem. Communicate with the course's teacher!");
                                                    this.display_url_video(current_lesson.url_video, error);
                                                }}               // Callback when video cannot be loaded
                                                poster = "data:image/png;base64,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"
                                                controls = {true}
                                                resizeMode = "contain"
                                                style={{
                                                    // position: 'absolute',
                                                    // top: 0,
                                                    // left: 0,
                                                    // bottom: 0,
                                                    // right: 0,
                                                    width: "100%",
                                                    height: "80%",
                                                }} 
                                                // fullscreen = {true}
                                            />

                                    :

                                        null
                            }

                        </View>

                    </View>
                    
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
                            // backgroundColor: "red",
                        }} 
                    >
                        {this.dislay_quiz(current_lesson)}
                    </Surface>

                );

                break;

            // quiz
            case "audio_transcription_quiz":
    
    
                //   return the template
                return (
    
                    <View
                        style = {{
                            flex:1,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            // backgroundColor: "pink",
                            width: "100%",
                        }}
                    >
                        
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
                            {this.display_audio(current_lesson)}

                        </Surface>
                        
                        {/* display quiz */}
                        <Surface
                            style = {{
                                flex:3,
                                flexDirection:'column',
                                alignItems:'center',
                                justifyContent:'space-around',
                                margin: 5,
                                elevation: 4,
                                // backgroundColor: "pink",
                                // width: "100%",
                            }} 
                        >
                            {this.dislay_quiz(current_lesson)}
                        </Surface>
    
                    </View>
                    
                );
                
                break;

            // audio_speech
            case "audio_speech":

                //   return the template
                return (
                    
                    <View
                        style = {{
                            flex:1,
                            flexDirection:'column',
                            alignItems:'center',
                            justifyContent:'space-around',
                            // backgroundColor: "pink",
                            width: "100%",
                        }}
                    >
                        
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
                            
                            {this.display_audio(current_lesson)}

                        </Surface>
                        
                        {/* display speech part */}
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

                            {/* instruction to the speech */}
                            <Text>
                                {current_lesson.instruction}
                            </Text>

                            {/* speech button */}
                            <Button
                                icon = "microphone"
                                mode = "contained"
                                onPress = {() => {
                                    
                                    Voice.start('en-US');
                                    
                                }}
                                // style = {{
                                //     backgroundColor: this.state.speaking && "red",
                                // }}
                            >

                                {this.state.speaking ? "Speaking" : "Speak"}

                            </Button>

                            {/* user speech */}
                            {
                                <Text>
                                    You are saying: {this.state.user_speech}
                                </Text>
                            }
                        </Surface>
    
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

                                        {this.display_lesson(this.state.current_lesson)}

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