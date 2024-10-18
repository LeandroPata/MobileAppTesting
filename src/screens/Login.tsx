import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useState, useEffect, useContext } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	Modal,
	SafeAreaView,
	Alert,
} from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [signUpVisible, setSignUpVisible] = useState(false);

	const navigation = useNavigation();

	//Set Theme according to system theme for first use
	//const isDarkMode = useColorScheme() === 'dark';

	const scheme: any = useContext(ThemeContext);
	const [mode, setMode] = useState(scheme.mode);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.navigate('Home');
			}
		});
		return unsubscribe;
	}, []);

	const handleSignUp = () => {
		if (password === confirmPassword) {
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredentials) => {
					const user = userCredentials.user;
				})
				.catch((error) => alert(error.message));
		} else {
			Alert.alert('Error', 'The passwords do not match');
			setPassword('');
			setConfirmPassword('');
		}
	};

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
			})
			.catch((error) => alert(error.message));
	};

	const backSignUp = () => {
		setSignUpVisible(!signUpVisible);
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};

	return (
		<KeyboardAvoidingView
			style={[theme.container, { backgroundColor: scheme.background }]}
			behavior='padding'
		>
			<Modal animationType='fade' transparent={true} visible={signUpVisible}>
				<SafeAreaView
					style={[theme.container, { backgroundColor: scheme.background }]}
				>
					<View style={theme.inputContainer}>
						<Image
							source={require('../assets/images/P5logo.png')}
							style={theme.image}
						/>

						<TextInput
							style={[
								theme.input,
								{
									backgroundColor: scheme.backgroundInput,
									borderColor: scheme.border,
									color: scheme.text,
								},
							]}
							placeholder='Email'
							placeholderTextColor={scheme.textPlaceholder}
							keyboardType='email-address'
							textContentType='emailAddress'
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>

						<TextInput
							style={[
								theme.input,
								{
									backgroundColor: scheme.backgroundInput,
									borderColor: scheme.border,
									color: scheme.text,
								},
							]}
							placeholder='Password'
							placeholderTextColor={scheme.textPlaceholder}
							keyboardType='default'
							secureTextEntry
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<TextInput
							style={[
								theme.input,
								{
									backgroundColor: scheme.backgroundInput,
									borderColor: scheme.border,
									color: scheme.text,
								},
							]}
							placeholder='Confirm Password'
							placeholderTextColor={scheme.textPlaceholder}
							keyboardType='default'
							secureTextEntry
							value={confirmPassword}
							onChangeText={(text) => setConfirmPassword(text)}
						/>
					</View>
					<TouchableOpacity
						onPress={handleSignUp}
						style={[theme.button, { backgroundColor: scheme.button }]}
					>
						<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
							Confirm
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={backSignUp}
						style={[theme.modalButton, { backgroundColor: scheme.button }]}
					>
						<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
							Back
						</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</Modal>
			<View style={theme.inputContainer}>
				<Image
					source={require('../assets/images/P5logo.png')}
					style={theme.image}
				/>

				<TextInput
					style={[
						theme.input,
						{
							backgroundColor: scheme.backgroundInput,
							borderColor: scheme.border,
							color: scheme.text,
						},
					]}
					placeholder='Email'
					placeholderTextColor={scheme.textPlaceholder}
					keyboardType='email-address'
					textContentType='emailAddress'
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>

				<TextInput
					style={[
						theme.input,
						{
							backgroundColor: scheme.backgroundInput,
							borderColor: scheme.border,
							color: scheme.text,
						},
					]}
					placeholder='Password'
					placeholderTextColor={scheme.textPlaceholder}
					keyboardType='default'
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>
			<View style={theme.buttonContainer}>
				<TouchableOpacity
					onPress={handleLogin}
					style={[theme.button, { backgroundColor: scheme.button }]}
				>
					<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
						Login
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setSignUpVisible(true)}
					style={[theme.button, { backgroundColor: scheme.button }]}
				>
					<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
						Sign Up
					</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style={scheme.statusBar} />
		</KeyboardAvoidingView>
	);
};

export default Login;
