import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FlashScreen from './screens/FlashScreen';
import Loading from './screens/Loading';
import * as React from 'react';
import Register from './screens/Register';
import ForgetPassword from './screens/ForgotPassword';
import Login from './screens/Login';
import Home from './screens/Home';
import BottomTab from './Navigation/BottomTab';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() { 
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="FlashScreen" component={FlashScreen} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPass" component={ForgetPassword} />
          <Stack.Screen name="BottomTab" component={BottomTab} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
