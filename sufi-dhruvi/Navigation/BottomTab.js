import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import ProfileDetail from '../screens/ProfileDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
import Profile from '../screens/Profile';
export default class BottomTab extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Profile') {
              iconName = 'ios-list-outline';
            }else if (route.name === 'Settings') {
              iconName = 'cog';
            }

            return (
              <Ionicons name={iconName} color={color} size={RFValue(25)} />
            );
          },

          tabBarLabel: '',
          tabBarActiveTintColor: '#006400',
          tabBarInactiveTintColor: '#567d4a',
          tabBarStyle: {
            backgroundColor: '#98BF64',
            height: '7%',
            overflow: 'hidden',
            position: 'absolute',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
         <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }
}
const HStack = createStackNavigator();
const HomeStack = () => {
  return (
    <HStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HStack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={{ headerShown: false }}
      />
    </HStack.Navigator>
  );
};
