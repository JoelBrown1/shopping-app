import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import AuthScreen from '../screens/user/AuthScreen'
import ProductDetails from '../screens/shop/ProductDetails';
import UserProducts from '../screens/user/UserProducts';
import EditProducts from '../screens/user/EditProducts';
import ProductsOverview from '../screens/shop/ProductsOverview';
import Cart from '../screens/shop/Cart';
import Orders from '../screens/shop/Orders';

import { Ionicons } from '@expo/vector-icons';

import Colors  from '../constants/Colors'

const ProductsNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const AdminNavigator = createStackNavigator();
const AuthenticationNavigator = createStackNavigator();
const DrawerNavigator = createDrawerNavigator();

const defaultScreenOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const MainNav = () => {
    return (
        <ProductsNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === "android" ? Colors.primary : '#fff',
                },
                headerTitleStyle: {
                    fontFamily: 'open-sans-bold',
                },
                headerBackTitleStyle: {
                    fontFamily: 'open-sans',
                    fontSize: 14
                },
                headerTintColor: Platform.OS === "android" ? "#fff" : Colors.accent
            }}
        >
        <ProductsNavigator.Screen 
                name="Products"
                component={ProductsOverview}
                options={
                    {
                        title: 'All Products',
                        // headerStyle: {
                        //     backgroundColor: Platform.OS === "android" ? Colors.primary : '#fff',
                        // },
                        // headerTitleStyle: {
                        //     fontFamily: 'open-sans-bold',
                        // },
                        // headerBackTitleStyle: {
                        //     fontFamily: 'open-sans-bold',
                        //     color: Colors.primary
                        // },
                        // headerTintColor: Platform.OS === "android" ? "#fff" : Colors.accent
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
            <ProductsNavigator.Screen 
                name="Cart"
                component={Cart}
                options={{
                    headerStyle: {
                        backgroundColor: Platform.OS === 'android'  ? Colors.primary : '#fff'
                    },
                    headerTintColor: Platform.OS === "android" ? "#fff" : Colors.accent
                }}
            />
        </ProductsNavigator.Navigator>
    )
}

const OrdersNav = () => {
    return(
        <OrdersNavigator.Navigator
            
        >
            <OrdersNavigator.Screen 
                name="Orders"
                component={Orders}
                options={{
                    title: 'Your Orders',
                }}
            />
        </OrdersNavigator.Navigator>
    )
}

const AuthenticationNav = () => {
    return(
        <AuthenticationNavigator.Navigator
            
        >
            <AuthenticationNavigator.Screen 
                name="SignIn"
                component={AuthScreen}
                options={{
                    title: 'Sign In',
                }}
            />
        </AuthenticationNavigator.Navigator>
    )
}

const AdminNav = () => {
    return(
        <AdminNavigator.Navigator
            
        >
            <AdminNavigator.Screen 
                name="UserProducts"
                component={UserProducts}
                options={{
                    title: 'User Products',
                }}
            />
            <AdminNavigator.Screen 
                name="EditProducts"
                component={EditProducts}
                options={({ route }) => (
                    {
                    title: route.params.title,
                    headerStyle: {
                        backgroundColor: Platform.OS === "android" ? Colors.primary : '#fff'
                    },
                    headerTintColor: Platform.OS === "android" ? "#fff" : Colors.accent
                })}
            />
        </AdminNavigator.Navigator>
    )
}

const ShopNavigator = () => {
    const authenticated = useSelector(state => state.auth);
    console.log("looking at the state of authenticated: ", authenticated);
    return (
        <NavigationContainer
            screenOptions={defaultScreenOptions}
        >
            <DrawerNavigator.Navigator
                initialRouteName="Products"
                drawerContentOptions={{
                    activeTintColor: Colors.primary,
                    inactiveTintColor: 'black',
                    labelStyle: {
                        fontFamily: 'open-sans-bold',
                        fontSize: 18,
                    }
                }}
            >
                <DrawerNavigator.Screen 
                    name="Products"
                    component={MainNav}
                    options={{
                        drawerIcon: (drawerConfig) => {
                        return (<Ionicons 
                            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                            size={23}
                            color={Colors.primary}
                        />)} ,
                    }}
                />
                <DrawerNavigator.Screen 
                    name="Orders"
                    component={OrdersNav}
                    options={{
                        drawerIcon: (drawerConfig) => <Ionicons 
                            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                            size={23}
                            color={drawerConfig.activeTintColor}
                        /> ,
                        activeTintColor: Colors.primary
                    }}
                />
                { authenticated.token == null ? (
                    <DrawerNavigator.Screen 
                        name="SignIN"
                        component={AuthenticationNav}
                        options={{
                            drawerIcon: (drawerConfig) => <Ionicons 
                                name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                                size={23}
                                color={drawerConfig.activeTintColor}
                            /> ,
                            activeTintColor: Colors.primary
                        }}
                    />) : (
                    <DrawerNavigator.Screen 
                    name="Admin"
                    component={AdminNav}
                    options={{
                        drawerIcon: (drawerConfig) => <Ionicons 
                            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                            size={23}
                            color={drawerConfig.activeTintColor}
                        /> ,
                        activeTintColor: Colors.primary
                    }}
                />)}
            </DrawerNavigator.Navigator>
        </NavigationContainer>
    )
}
export default ShopNavigator;