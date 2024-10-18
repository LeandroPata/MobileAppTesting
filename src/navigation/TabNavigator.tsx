import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { View } from 'react-native';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Home';
import Checkout from '../screens/Checkout';
import Settings from '../screens/Settings';

Icon.loadFont();

//Change theme's colors according to focused:!focused
//See tabBarIcon

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
	const scheme: any = useContext(ThemeContext);
	//const [mode, setMode] = useState(scheme.mode);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: scheme.bottomBarBackground,
					...theme.bottomTab,
				},
				tabBarActiveTintColor: scheme.highlight,
			}}
		>
			<Tab.Screen
				name='HomeTab'
				component={Home}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={theme.container}>
							<Icon name='home' size={30} color={'#ffffff'} />
						</View>
					),
					headerShown: false,
					tabBarLabel: 'HOME',
					tabBarLabelStyle: {
						...theme.bottomTabText,
					},
				}}
			/>
			<Tab.Screen
				name='CheckoutTab'
				component={Checkout}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={theme.container}>
							<Icon name='nfc' size={30} color={'#ffffff'} />
						</View>
					),
					headerShown: false,
					tabBarLabel: 'CHECKOUT',
					tabBarLabelStyle: {
						...theme.bottomTabText,
					},
				}}
			/>
			<Tab.Screen
				name='SettingsTab'
				component={Settings}
				options={{
					tabBarIcon: ({ focused }) => (
						<View style={theme.container}>
							<Icon name='settings' size={30} color={'#ffffff'} />
						</View>
					),
					headerShown: false,
					tabBarLabel: 'SETTINGS',
					tabBarLabelStyle: {
						...theme.bottomTabText,
					},
				}}
			/>
		</Tab.Navigator>
	);
}
