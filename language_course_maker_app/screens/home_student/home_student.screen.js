import React, { Component } from 'react';
import {
    // Alert,
    // // Platform,
    // StyleSheet,
    // Button,
    // Text,
    View,
    // Image,
    // ProgressBarAndroid,
    FlatList,
    // ImageBackground,
    // TouchableOpacity
    // PermissionsAndroid,
} from 'react-native';

import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';
import { 
    Button, 
    Card, 
    Title, 
    Paragraph,
    ActivityIndicator,
    // Appbar,
    // TextInput,
    Text,
    Badge,
} from 'react-native-paper';

import App_Bar from "../../components/app_bar/app_bar.component";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

var logged_user = null;

class Home_Student extends Component {

    // Options for header bar
    static navigationOptions = ({ navigation }) => {

        return {
            header: null,
        };
    };

    //Constructor
    constructor(props) {

        super(props);

        this.state = {

            courses: null,
            loading: false,
        };

        this.select_course = this.select_course.bind(this);


    }
    
    componentDidMount() {

        // this.create_new_course();

        // update state
        this.setState({
            loading: true,
        });
        
        // check authentication
        auth().onAuthStateChanged((user) => {

            // User is signed in.
            if (user) {

                logged_user = user;
                
                // get type of courses reference
                var ref = null;

                // check type of courses
                // check if courses_type is defined
                if (this.props.navigation.state.params != null) {

                    // set reference
                    switch (this.props.navigation.state.params.courses_type) {
    
                        case ("general"):
    
                            ref = firestore().collection("courses");

                            break;

                        case ("registered"):

                            // get ucourses where the user is registered
                            ref = firestore().collection("courses").where("registered_users", "array-contains", logged_user.uid);
    
                    }
                }

                // if courses_type is not defined
                else {
                    ref = firestore().collection("courses");
                }

                // get courses
                ref.get()
                .then(snapshotquery => {

                    // console.log("snapshotquery size: ", snapshotquery.size);

                    // array of contacts
                    var courses = [];
                    
                    // iterate over each item
                    snapshotquery.forEach(doc => {
                        //console.log("new doc: ", doc.data());
                        
                        // create new course
                        var new_course = {};

                        // add user data
                        new_course = doc.data();
                        new_course.course_id = doc.id;

                        // console.log("new course: ", new_course);

                        // add course to list
                        courses.push(new_course);

                    });

                    // console.log("courses list: ", courses);
                  
                    // update contact list
                    this.setState({
                        courses: courses,
                        //   contacts: this.state.contacts.concat(courses),
                        loading: false,
                    })

                })

                .catch(error => {

                    console.log("error trying to get the courses: ", error);

                })
            }   
        });
    }

    select_course(course) {

        // alert("start course");
        this.props.navigation.push("Course_Introduction", {course: course})

    }

    // create new course function
    create_new_course() {

        // fake course
        const new_course = {
            "course_buy_link": "",
            "course_price": 29.9,
            "registered_users": [],
            "course_subtitle": "Here is the subtitle",
            "image": "https://image.pushauction.com/0/0/15bfc40c-7524-4d7b-b33f-59ee0725ab2d/9baf592d-2bf9-4bea-ad87-772d1e907821.jpg",
            "course_description": "Course description here",
            "course_author": "Leonardo Bravo",
            "course_name": "English from scratch to fluid",
            "lessons" : [
                {
                    "name": "Learning the pronouns",
                    "type": "quiz",
                    "quiz_question": "DO you think ?",
                    "quiz_alternatives": [
                        "alt 1",
                        "alt 2",
                        "alt 3",
                    ],
                    "quiz_correct_alternative": 0
                }
            ],
            "final_course_message": "final message",
        }

        firestore().collection("courses").add(new_course)
        .then(res => {
            console.log("new course created: ", res);
        })
        .catch(error => {
            console.log("error trying to create a new course: ", error);
        })
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
                    // backgroundColor: "yellow",
                }}
            >

                    {/* app bar */}
                    <App_Bar/>

                    {/* title */}
                    <Title>
                        {(this.props.navigation.state.params == null || this.props.navigation.state.params.courses_type == "general") ? "Explore different courses" : "Your courses"}
                    </Title>

                    {/* list of courses */}
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
                            // backgroundColor: "orange",
                            width: "100%",
                        }}
                    >
        

                        {!this.state.loading
                        
                            ?

                                this.state.courses != null && this.state.courses.length > 0

                                    ?

                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            // data={this.state.contacts}
                                            data = {this.state.courses}
                                            style = {{
                                                // backgroundColor: "red",
                                                width: "100%",
                                                alignSelf: "flex-start",
                                            }}
                                            renderItem={
                                                ({ item, index }) =>

                                                    <Card
                                                        style = {{
                                                            // backgroundColor: "red",
                                                            elevation: 4,
                                                            margin: 20,
                                                        }}
                                                    >

                                                        <Card.Title 
                                                            title = {item.course_name}
                                                            subtitle = {item.course_author}
                                                        />
                                                        
                                                        <Card.Cover 
                                                            source={{ uri: item.image }} 
                                                        />

                                                        <Card.Content>

                                                            <Paragraph>

                                                                {item.course_subtitle}
                                                                
                                                            </Paragraph>
                                                            
                                                        </Card.Content>

                                                        <Card.Content>
                                                            
                                                            <Badge
                                                                style = {{
                                                                    backgroundColor: "green",
                                                                }}
                                                            >
                                                                {item.course_price != 0 ? (item.course_price + " USD") : "FREE"}
                                                            </Badge>

                                                        </Card.Content>
                                                            
                                                        <Card.Actions
                                                            style = {{
                                                                alignSelf: "center",
                                                            }}
                                                        >

                                                            <Button
                                                                icon = "arrow-right-circle"
                                                                // buttonStyle = {{alignSelf: "center"}}
                                                                mode = "contained"
                                                                onPress={() => this.select_course(item)}
                                                            >
                                                                Check the course
                                                            </Button>
                                                            
                                                        </Card.Actions>

                                                    </Card>
                                            }
                                        />

                                    :

                                        <Text>
                                            No courses available yet
                                        </Text>

                            :

                                <ActivityIndicator size = "large" />
                                    
                        }
                        
                    </View>
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
//         fontSize: 18,
//         // margin: 10,
//     }
// })

// const TabNavigator = createBottomTabNavigator({
//   Places_by_Category: { screen: 'Places_by_Category' },
//   // Settings: { screen: SettingsScreen },
// });

export default withNavigation(Home_Student);