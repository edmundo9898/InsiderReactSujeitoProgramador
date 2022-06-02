import React  from 'react';

import { createNativeStackNavigator} from '@react-navigation/native-stack';


//Importando as Pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import CategoryPost from './pages/CategoryPost';
import Search from './pages/Search';


const Stack = createNativeStackNavigator();


function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false
            }}
            />

            <Stack.Screen  
            name="Detail"
            component={Detail}
            options={{
                title: 'Detalhes',
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor: '#232630'
                }
            }}
            />

            <Stack.Screen 
            name='Category'
            component={CategoryPost}
            options={{
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor: '#232630'
                }
            }}
            />

            <Stack.Screen 
            name='Search'
            component={Search}
            options={{
                title: "Procurando algo?",
                headerTintColor: '#fff',
                headerStyle:{
                    backgroundColor: '#232630'
                }

            }}
            />
        </Stack.Navigator>
    )
}


export default Routes;