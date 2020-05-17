import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { 
    withNavigation,
} from 'react-navigation';

import { 
    Button, 
    Text,
} from 'react-native-paper';

class Audio extends Component {

    //Constructor
    constructor(props) {

        super(props);

    }
    
    // Render method
    render() {

        const component = this.props.component;

        // return quiz component
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

                        disabled = {this.props.loading_file}
                        
                        loading = {this.props.loading_file}

                        icon = {!this.props.play_audio ? "play-circle-outline" : "stop"}
                        
                        // title = "Listen the audio"
                        // onPress={() => {

                        //     const play_audio = !this.props.play_audio;
                            
                        //     // update state
                        //     this.setState({
                        //         play_audio: play_audio,
                        //     });
                            
                        //     // play audio function
                        //     if (play_audio) {
                                
                        //         this.play_audio(component.audio_url);
                        //     }
                            
                        //     // stop audio function
                        //     else {
                        //         this.stop_audio(component.audio_url);
                        //     }
                            
                        // }}
                        onPress = {() => this.props.handler_play_audio(component.audio_url)}

                        mode = "contained"
                    >

                        {!this.props.play_audio ? "Listen Audio" : (this.props.loading_file ? "Loading audio" : "Stop audio")}

                    </Button>

                </View>
                
                {/* audio transcription */}
                <Text
                    style = {[
                        {
                            flex: 1,
                            textAlign: "center",
                        }
                    ]}
                >
                    {component.audio_transcription}
                </Text>

            </View>
        )
    
    }

}

export default withNavigation(Audio);