import React from 'react';

import {
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'

import Course_Id from "./screens/course_id/course_id.screen";
import Course_Introduction from "./screens/course_introduction/course_introduction.screen";
import Course_Lessons from "./screens/lessons/lessons.screen";
import End_of_Course from "./screens/end_of_course/end_of_course.screen";
import Login from "./screens/login/login.screen";
import Register from "./screens/register/register.screen";
import Home_Student from "./screens/home_student/home_student.screen";
import Edit_User_Profile from "./screens/edit_user_profile/edit_user_profile.screen";

const AppStackNavigator = createStackNavigator(
  // {headerLayoutPreset: 'center'},
  {
    
    Login: Login,
    Register: Register,
    Home_Student: Home_Student,
    Course_Id: Course_Id,
    Course_Introduction: Course_Introduction,
    Course_Lessons: Course_Lessons,
    End_of_Course: End_of_Course,
    Edit_User_Profile: Edit_User_Profile,
    // Home: Home,
    // Choose_Check_List_Type: Choose_Check_List_Type,
    // Choose_One_List: Choose_One_List,
    // Specific_List: Specific_List,
    // Place_Details: Place_Details,
    // Add_Video: Add_Video,
    // Map: Main_Map,
    // Location_Details: Location_Details,
    // Add_Place: Add_Place,

  },

  {
    headerMode: 'screen',
    headerLayoutPreset: 'center'
  },

  {
    initialRouteName: "Login",
    // headerLayoutPreset: 'center',
    // defaultNavigationOptions: {

      // headerLayoutPreset: 'center',

      //  headerStyle: {
      //   backgroundColor: '#3f5fe0',
      // },
      // headerTintColor: '#3f5fe0',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
      // headerStyle: { backgroundColor: 'red' },
      // headerTitleStyle: { color: 'green' },

      headerStyle: {
        elevation: 10,
      },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }
  // },


);


const App = createAppContainer(AppStackNavigator);

export default App;