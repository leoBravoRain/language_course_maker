import React from 'react';

import {
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'

import Course_Id from "./screens/course_id/course_id.screen";
import Course_Introduction from "./screens/course_introduction/course_introduction.screen";
import Course_Lessons from "./screens/lessons/lessons.screen";


const AppStackNavigator = createStackNavigator(
  // {headerLayoutPreset: 'center'},
  {
    
    Course_Id: Course_Id,
    Course_Introduction: Course_Introduction,
    Course_Lessons: Course_Lessons,
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