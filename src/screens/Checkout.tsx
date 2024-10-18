import { Text, SafeAreaView, Image, Pressable } from 'react-native';
import React, { useContext } from 'react';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/core';

const Checkout = () => {
	const scheme: any = useContext(ThemeContext);
	const navigation = useNavigation();

	return (
		<SafeAreaView
			style={[theme.container, { backgroundColor: scheme.background }]}
		>
			<Image
				source={require('../assets/images/P5logo.png')}
				style={theme.image}
			/>
			<Pressable style={[theme.button, { backgroundColor: scheme.button }]}>
				<Text
					onPress={() => {
						navigation.navigate('Cart');
					}}
					style={[theme.buttonText, { color: scheme.buttonText }]}
				>
					Checkout
				</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default Checkout;
