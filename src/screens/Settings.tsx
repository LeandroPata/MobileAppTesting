import React, { useState, useContext } from 'react';
import {
	Text,
	TouchableOpacity,
	SafeAreaView,
	Switch,
	Image,
	Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { EventRegister } from 'react-native-event-listeners';
import colors from '../assets/colors/colors';
import { storeData } from '../storage/asyncStorage';
import { signOut } from 'firebase/auth';
import { StripeProvider } from '@stripe/stripe-react-native';
import { MERCHANT_ID, PUBLISHABLE_KEY } from '../data/Constants';
import { auth } from '../firebase';

const Settings = () => {
	const navigation = useNavigation();
	const scheme: any = useContext(ThemeContext);
	let aux = scheme;
	aux === colors.dark ? (aux = true) : (aux = false);
	const [mode, setMode] = useState(aux);
	const [termsVisible, setTermsVisible] = useState(false);
	const [privacyVisible, setPrivacyVisible] = useState(false);
	const [faqsVisible, setFaqsVisible] = useState(false);
	const [suggestionVisible, setSuggestionVisible] = useState(false);
	const [paymentMethodVisible, setPaymentMethodVisible] = useState(false);

	const updateTheme = (newTheme) => {
		let aux;
		if (!newTheme) {
			aux = mode === true ? false : true;
			newTheme = aux;
		}
		setMode(newTheme);
		storeData('activeTheme', newTheme);
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				navigation.navigate('Login');
			})
			.catch((error) => alert(error.message));
	};

	return (
		<StripeProvider
			publishableKey={PUBLISHABLE_KEY}
			merchantIdentifier={MERCHANT_ID}
		>
			<SafeAreaView
				style={[theme.container, { backgroundColor: scheme.background }]}
			>
				<Image
					source={require('../assets/images/P5logo.png')}
					style={[
						theme.image,
						{ width: 125, height: 125, marginTop: -200, marginBottom: 100 },
					]}
				/>
				<Modal animationType='fade' transparent={true} visible={faqsVisible}>
					<SafeAreaView
						style={[theme.container, { backgroundColor: scheme.background }]}
					>
						<SafeAreaView style={[scheme.modalContainer]}>
							<Text style={{ color: scheme.text, alignSelf: 'center' }}>
								FAQs
							</Text>
							<TouchableOpacity
								onPress={() => setFaqsVisible(!faqsVisible)}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, top: 250 },
								]}
							>
								<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
									Close
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</SafeAreaView>
				</Modal>
				<Modal
					animationType='fade'
					transparent={true}
					visible={suggestionVisible}
				>
					<SafeAreaView
						style={[theme.container, { backgroundColor: scheme.background }]}
					>
						<SafeAreaView style={[scheme.modalContainer]}>
							<Text style={{ color: scheme.text }}>Suggestions</Text>
							<TouchableOpacity
								onPress={() => setSuggestionVisible(!suggestionVisible)}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, top: 250 },
								]}
							>
								<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
									Close
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</SafeAreaView>
				</Modal>
				<Modal animationType='fade' transparent={true} visible={termsVisible}>
					<SafeAreaView
						style={[theme.container, { backgroundColor: scheme.background }]}
					>
						<SafeAreaView style={[scheme.modalContainer]}>
							<Text style={{ color: scheme.text, alignSelf: 'center' }}>
								Terms and Conditions
							</Text>
							<TouchableOpacity
								onPress={() => setTermsVisible(!termsVisible)}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, top: 250 },
								]}
							>
								<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
									Close
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</SafeAreaView>
				</Modal>
				<Modal animationType='fade' transparent={true} visible={privacyVisible}>
					<SafeAreaView
						style={[theme.container, { backgroundColor: scheme.background }]}
					>
						<SafeAreaView style={[scheme.modalContainer]}>
							<Text style={{ color: scheme.text, alignSelf: 'center' }}>
								Privacy Policy
							</Text>
							<TouchableOpacity
								onPress={() => setPrivacyVisible(!privacyVisible)}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, top: 250 },
								]}
							>
								<Text style={{ color: scheme.buttonText }}>Close</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</SafeAreaView>
				</Modal>
				<Modal
					animationType='fade'
					transparent={true}
					visible={paymentMethodVisible}
				>
					<SafeAreaView
						style={[theme.container, { backgroundColor: scheme.background }]}
					>
						<SafeAreaView style={[scheme.modalContainer]}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('SetupPayment');
								}}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, width: 170 },
								]}
							>
								<Text style={{ color: scheme.buttonText }}>
									Add Payment Method
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
						<SafeAreaView style={[scheme.modalContainer]}>
							<TouchableOpacity
								//onPress={}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, width: 200 },
								]}
							>
								<Text style={{ color: scheme.buttonText }}>
									Remove Payment Method
								</Text>
							</TouchableOpacity>
						</SafeAreaView>
						<SafeAreaView style={[scheme.modalContainer]}>
							<TouchableOpacity
								onPress={() => setPaymentMethodVisible(!paymentMethodVisible)}
								style={[
									theme.modalButton,
									{ backgroundColor: scheme.button, top: 250 },
								]}
							>
								<Text style={{ color: scheme.buttonText }}>Close</Text>
							</TouchableOpacity>
						</SafeAreaView>
					</SafeAreaView>
				</Modal>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => navigation.navigate('Profile')}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>Profile</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => setFaqsVisible(true)}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>FAQs</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => setSuggestionVisible(true)}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>Suggestions</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => setPrivacyVisible(true)}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>Privacy Policy</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => setTermsVisible(true)}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>Terms and Conditions</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<TouchableOpacity
						onPress={() => setPaymentMethodVisible(true)}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>Payment Methods</Text>
					</TouchableOpacity>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomColor: scheme.text,
						},
					]}
				>
					<Text style={{ color: scheme.text }}>Dark Mode: </Text>
					<Switch
						onValueChange={(value) => {
							setMode((value) => !value);
							updateTheme(value);
							EventRegister.emit('changeTheme', value);
						}}
						value={aux}
					/>
				</SafeAreaView>
				<SafeAreaView
					style={[
						theme.settingsContainer,
						{
							borderBottomWidth: 0,
						},
					]}
				>
					<TouchableOpacity
						onPress={handleSignOut}
						style={[
							theme.settingsButton,
							{ backgroundColor: scheme.settingsButton },
						]}
					>
						<Text style={{ color: scheme.text }}>Sign Out</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</SafeAreaView>
		</StripeProvider>
	);
};

export default Settings;
