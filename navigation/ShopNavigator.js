import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductDetails from '../screens/shop/ProductDetails';
import ProductsOverview from '../screens/shop/ProductsOverview';

import Colors  from '../constants/Colors'
console.log("wht is in colors: ", Colors);

const ProductsNavigator = createStackNavigator();

const defaultScreenOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
}

const Main = () => {

    return (
        <NavigationContainer
            screenOptions={defaultScreenOptions}
        >
            <ProductsNavigator.Navigator>
            <ProductsNavigator.Screen 
                    name="Products"
                    component={ProductsOverview}
                    options={
                        {
                            title: 'All Products',
                            headerStyle: {
                                backgroundColor: Platform.OS === "android" ? Colors.primary : '#fff'
                            },
                            headerTintColor: Platform.OS === "android" ? "#fff" : Colors.accent
                        }
                    }
                />
                <ProductsNavigator.Screen 
                    name="ProductDetails"
                    component={ProductDetails}
                    options={
                        /**
                         * you can configure the header to take properties like "title" from the
                         * route property.
                         * this is set when the route is called - in this case from the ProductsOverview screen
                         * where we pass params for each product through the viewDetails function
                         */
                        ({ route }) => ({
                            title: route.params.title,
                            headerStyle: {
                                backgroundColor: Platform.OS === "android" ? Colors.primary : '#fff'
                            },
                            headerTintColor: Platform.OS === "android" ? "#fff" : Colors.accent
                        })
                    }
                />
            </ProductsNavigator.Navigator>
        </NavigationContainer>
    )
}

export default Main;