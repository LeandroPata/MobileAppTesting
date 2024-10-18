import { Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { auth } from '../firebase';

const Home = () => {
	const scheme: any = useContext(ThemeContext);

	return (
		<SafeAreaView
			style={[theme.container, { backgroundColor: scheme.background }]}
		>
			<Image
				source={require('../assets/images/P5logo.png')}
				style={theme.image}
			/>
			<Text style={{ color: scheme.text }}>
				Email: {auth.currentUser?.email}
			</Text>
		</SafeAreaView>
	);
};

export default Home;
