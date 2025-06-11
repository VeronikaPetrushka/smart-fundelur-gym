import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import fundelurPages from './appStructure/appImports/pages';

type RootStackParamList = {
    Fundelurhome: undefined;
    Fundeluraddclass: undefined;
    Fundeluraddclient: undefined;
    Fundeluraddinventory: undefined;
    Fundeluraddpayment: undefined;
    Fundeluraddtraining: undefined;
    Fundelurclientinfo: undefined;
    Fundelurinventory: undefined;
    Fundelurinventoryinfo: undefined;
    Fundeluronboarding: undefined;
    Fundelurreports: undefined;
    Fundelursettings: undefined;
    Fundelurtraining: undefined;
    Fundelurtraininginfo: undefined;
    Fundelurvisits: undefined;
    Fundelurnotifications: undefined;
    Fundelurcurrency: undefined;
};

enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator
              initialRouteName={"Fundeluronboarding"}
              screenOptions={{
                headerShown: false
              }}
          >    
                <Stack.Screen 
                      name="Fundelurhome" 
                      component={fundelurPages.FundelurhomePage} 
                />
                <Stack.Screen 
                      name="Fundeluraddclass" 
                      component={fundelurPages.FundeluraddclassPage} 
                />
                <Stack.Screen 
                      name="Fundeluraddclient" 
                      component={fundelurPages.FundeluraddclientPage} 
                />
                <Stack.Screen 
                      name="Fundeluraddinventory" 
                      component={fundelurPages.FundeluraddinventoryPage} 
                />
                <Stack.Screen 
                      name="Fundeluraddpayment" 
                      component={fundelurPages.FundeluraddpaymentPage} 
                />
                <Stack.Screen 
                      name="Fundeluraddtraining" 
                      component={fundelurPages.FundeluraddtrainingPage} 
                />
                <Stack.Screen 
                      name="Fundelurclientinfo" 
                      component={fundelurPages.FundelurclientinfoPage} 
                />
                <Stack.Screen 
                      name="Fundelurinventory" 
                      component={fundelurPages.FundelurinventoryPage} 
                />
                <Stack.Screen 
                      name="Fundelurinventoryinfo" 
                      component={fundelurPages.FundelurinventoryinfoPage} 
                />
                <Stack.Screen 
                      name="Fundeluronboarding" 
                      component={fundelurPages.FundeluronboardingPage} 
                />
                <Stack.Screen 
                      name="Fundelurreports" 
                      component={fundelurPages.FundelurreportsPage} 
                />
                <Stack.Screen 
                      name="Fundelursettings" 
                      component={fundelurPages.FundelursettingsPage} 
                />
                <Stack.Screen 
                      name="Fundelurtraining" 
                      component={fundelurPages.FundelurtrainingPage} 
                />
                <Stack.Screen 
                      name="Fundelurtraininginfo" 
                      component={fundelurPages.FundelurtraininginfoPage} 
                />
                <Stack.Screen 
                      name="Fundelurvisits" 
                      component={fundelurPages.FundelurvisitsPage} 
                />
                <Stack.Screen 
                      name="Fundelurnotifications" 
                      component={fundelurPages.FundelurnotificationsPage} 
                />
                <Stack.Screen 
                      name="Fundelurcurrency" 
                      component={fundelurPages.FundelurcurrencyPage} 
                />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;