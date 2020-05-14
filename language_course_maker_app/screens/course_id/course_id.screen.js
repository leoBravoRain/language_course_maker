import React, { Component } from 'react';
import {
    Alert,
    // // Platform,
    StyleSheet,
    // Button,
    Text,
    View,
    // Image,
    // ProgressBarAndroid,
    // FlatList,
    ImageBackground,
    // TouchableOpacity
    // PermissionsAndroid,
} from 'react-native';
import {
    Input,
    // Button
} from 'react-native-elements'
import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';

import { 
    Button,
    TextInput,
    Title,
    Headline,
    ActivityIndicator,
} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

class Course_Id extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            // title: "Ingresar",
            header: null,
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
            // course_id: null,
            course_id: "8Y1nToJGMj8zxRMhlTlL",
            // user_email: null,
            // password: null,
            // // user_email: "leo.bravo.rain@gmail.com",
            // // password: "123456",
            // // user_email: "1andreatapiasalinas@gmail.com",
            // // password: "123123",
            loading: false,
        };

        this.enter_course = this.enter_course.bind(this);
        // this.register = this.register.bind(this);


    }
    
    componentDidMount() {
        
        
    }
    
    enter_course() {

        this.setState({
            loading: true,
        });

        // do DB request and check if course ID is correct
        firestore().collection("courses").doc(this.state.course_id).get()
    
        .then(doc => {
            
            // console.log("request");
            
            // check doc exists
            if (doc.exists) {
                
                var course = doc.data();

                this.setState({
                    loading: false,
                });

                // if it is correct, redirect to course
                this.props.navigation.push("Course_Introduction", {course: course});
            }

            // if course does not exists
            else {

                alert("Sorry! We have not found a course with that ID");
                
                this.setState({
                    loading: false,
                });

            }
        })

    }
        
    // Render method
    render() {

        // url background image
        const url_image = "https://wallpaperaccess.com/full/180132.jpg";

        // return method
        return (
            
            <ImageBackground 
                source={{ uri: url_image }} 
                style={{ width: '100%', height: '100%' }}
            >

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

                            <View
                                style = {{
                                    // display: "flex",
                                    // flex: 1,
                                    // justifyContent: 'center',
                                    // alignItems: 'center'
                                    flex:1,
                                    flexDirection:'column',
                                    // alignItems:'center',
                                    justifyContent:'space-around',
                                }}
                            >

                                <Headline
                                    style = {{
                                        textAlign: "center",
                                    }}
                                >
                                    Language Course
                                </Headline>
                                {/* enter course ID */}

                                {/* <Text>
                                    Enter course ID
                                </Text> */}

                                <TextInput
                                    label = 'Enter course ID'
                                    value={this.state.course_id}
                                    onChangeText={text => this.setState({ course_id: text })}
                                />
                                
                                {/* <Input
                                    placeholder='Course ID'
                                    autoCapitalize='none'
                                    onChangeText={text => this.setState({ course_id: text })}
                                    value={this.state.course_id}
                                    containerStyle = {{
                                        // backgroundColor: "red",
                                        width: 200,
                                        // color: "white",
                                    }}
                                /> */}
                                
                                <Button 
                                    icon="arrow-right-circle"
                                    mode = "contained" 
                                    onPress={() => this.enter_course()}
                                >
                                    Enter course
                                </Button>

                                {/* <Button
                                    title = "Enter course"
                                    onPress={() => this.enter_course()}
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
                                /> */}
                                {/*
                                <Button
                                    title="Sign-up"
                                    onPress={() => this.register()}
                                    buttonStyle={[
                                        styles.button,
                                        {
                                            backgroundColor: "green",
                                            // width: 200,
                                            // height: "50%",
                                            // alignSelf: "center"
                                        }
                                    ]}
                                /> */}

                                {/* <Text
                                    style={[styles.text], { textAlign: "center", color: "white", backgroundColor: "rgba(124, 144, 233, 0.77)", width: 200, alignSelf: "center", padding: 10, borderRadius: 40}}
                                >
                                    Si quieres registrarte, solamente ingresa tu correo electrónico y alguna clave (cualquiera). Luego presiona el botón "Registrarme"
                                </Text> */}
                            </View>
                        :

                            <ActivityIndicator size = "large" animating={true}/>
                                    
                        }

                </View>
            </ImageBackground>
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

export default withNavigation(Course_Id);