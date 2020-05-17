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

import Voice from '@react-native-community/voice';

class Speak extends Component {

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
                {/* instruction to the speech */}
                <Text>
                    {component.instruction}
                </Text>

                {/* speech button */}
                <Button
                    icon = "microphone"
                    mode = "contained"
                    onPress = {() => {
                        
                        Voice.start('en-US');
                        
                    }}
                >

                    {this.props.speaking ? "Listening" : "Speak"}

                </Button>

                {/* user speech */}
                {
                    <Text>
                        You are saying: {this.props.user_speech}
                    </Text>
                }

                {/* check if speech is correct */}
                <Button
                    icon = "check"
                    // mode = "contained"
                    onPress = {() => {
                        
                        if (component.correct_answer == this.props.user_speech) {
                            alert("Congratulations! Your speech is correct!");
                        }
                        else {
                            alert("Ups! It is not correct. Try again");
                        }
                    }}
                >

                    Check my speech

                </Button>

            </View>
        )
    
    }

}

export default withNavigation(Speak);