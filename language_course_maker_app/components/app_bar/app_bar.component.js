import React, { Component } from 'react';
import { 
    Appbar,
} from 'react-native-paper';
import { 
    withNavigation,
    // NavigationActions,
    // StackActions,
} from 'react-navigation';

class App_Bar extends Component {

    //Constructor
    constructor(props) {

        super(props);

    }
    
    // Render method
    render() {

        // return method
        return (
            
            <Appbar 
                style={{
                    // backgroundColor: "red",
                    width: "100%",
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-around',
                }}
            >

                {/* general courses */}
                <Appbar.Action 
                    icon="home" 
                    onPress={() => 
                        this.props.navigation.push("Home_Student", {courses_type: "general"})
                    } 
                />
                
                {/* registered courses */}
                <Appbar.Action 
                    icon="folder" 
                    onPress={() => 
                        this.props.navigation.push("Home_Student", {courses_type: "registered"})
                    } 
                />

                {/* user profile */}
                <Appbar.Action 
                    icon="account" 
                    onPress={() => 
                        this.props.navigation.push("Edit_User_Profile")
                    } 
                />

            </Appbar>

                    
        );

    }

}

export default withNavigation(App_Bar);