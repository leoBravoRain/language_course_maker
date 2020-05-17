import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { 
    withNavigation,
} from 'react-navigation';

import { 
    Button, 
    Paragraph,
} from 'react-native-paper';

class Quiz_Alternatives extends Component {

    //Constructor
    constructor(props) {

        super(props);

    }
    
    // Render method
    render() {

        const component = this.props.component;

        // console.log("new componetn");

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

                <Paragraph
                    style = {{
                        textAlign: "center",
                    }}
                >
                    {component.quiz_question}
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
                        component.quiz_alternatives.map((alternative, index) => {
                            
                            return (

                                <Button
                                    key = {index}
                                    mode = "outlined"
                                    onPress = {() => {
                                            
                                        // check if answer is correct
                                        if (component.quiz_correct_answer == index) {
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

}

export default withNavigation(Quiz_Alternatives);