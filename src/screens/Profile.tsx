import {
	Text,
	TouchableOpacity,
	SafeAreaView,
	Image,
	Modal,
	TextInput,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/core';
import theme from '../assets/styles/theme';
import ThemeContext from '../context/ThemeContext';
import { auth, db } from '../firebase';
import { collection, addDoc, setDoc, getDoc, doc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';

const Home = () => {
	const scheme: any = useContext(ThemeContext);
	const navigation = useNavigation();

	const [name, setName] = useState('');
	const [mail, setMail] = useState(auth.currentUser?.email);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [nameDB, setNameDB] = useState('');
	const [mailDB, setMailDB] = useState(auth.currentUser?.email);
	const [phoneNumberDB, setPhoneNumberDB] = useState('');
	const [phone, setPhone] = useState('');
	const phoneInput = useRef<PhoneInput>(null);

	useEffect(() => {
		const readData = async () => {
			const docRef = doc(db, 'users', auth.currentUser.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setNameDB(docSnap.data().Name);
				setPhoneNumberDB(docSnap.data().Phone);
				setMailDB(docSnap.data().Email);
				setName(docSnap.data().Name);
				setPhoneNumber(docSnap.data().Phone);
				setMail(docSnap.data().Email);
			} else {
				console.log('No data found!');
			}
		};
		readData();
	}, []);

	const saveData = async () => {
		const checkvalid = phoneInput.current?.isValidNumber(phone);
		//console.log(checkvalid);
		if (checkvalid) {
			await setDoc(doc(db, 'users', auth.currentUser.uid), {
				Name: name,
				Email: mail,
				Phone: phoneNumber,
			});
			//console.log('Data written!');
			setNameDB(name);
			setMailDB(mail);
			setPhoneNumberDB(phoneNumber);
		} else {
			Alert.alert('Error', 'The phone number inserted is not valid!');
			setName(nameDB);
			setMail(mailDB);
			setPhoneNumber(phoneNumberDB);
		}
	};

	const saveEmail = async () => {
		updateEmail(auth.currentUser, mail)
			.then(() => {
				saveData;
			})
			.catch((error) => {
				Alert.alert('Error', 'An error ocurred!');
			});
	};

	return (
		<KeyboardAvoidingView
			style={[theme.container, { backgroundColor: scheme.background }]}
		>
			<Modal animationType='fade' transparent={true} visible={false}>
				<KeyboardAvoidingView
					style={[theme.container, { backgroundColor: scheme.background }]}
				>
					<SafeAreaView style={[theme.editContainer, { borderBottomWidth: 0 }]}>
						<TextInput
							style={[
								theme.editInput,
								{
									backgroundColor: scheme.backgroundInput,
									borderColor: scheme.border,
									color: scheme.text,
								},
							]}
							placeholder='Email'
							placeholderTextColor={scheme.textPlaceholder}
							keyboardType='default'
							textContentType='givenName'
							value={mail}
							onChangeText={(text) => setMail(text)}
						/>
						<TouchableOpacity
							onPress={saveEmail}
							style={[
								theme.button,
								{ backgroundColor: scheme.button, marginTop: 0 },
							]}
						>
							<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
								Save
							</Text>
						</TouchableOpacity>
					</SafeAreaView>
					<TouchableOpacity
						//onPress={() => setEmailVisible(!emailVisible)}
						style={[
							theme.modalButton,
							{ backgroundColor: scheme.button, top: 200 },
						]}
					>
						<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
							Close
						</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</Modal>
			<Image
				source={require('../assets/images/P5logo.png')}
				style={[theme.image, { bottom: 0 }]}
			/>
			<SafeAreaView
				style={[theme.editContainer, { borderColor: scheme.border }]}
			>
				<Text style={{ color: scheme.text }}>Name: {nameDB}</Text>
				<TextInput
					style={[
						theme.editInput,
						{
							backgroundColor: scheme.backgroundInput,
							borderColor: scheme.border,
							color: scheme.text,
						},
					]}
					placeholder='Name'
					placeholderTextColor={scheme.textPlaceholder}
					keyboardType='default'
					textContentType='givenName'
					//value={name}
					onChangeText={(text) => setName(text)}
				/>
			</SafeAreaView>
			<SafeAreaView
				style={[theme.editContainer, { borderColor: scheme.border }]}
			>
				<Text style={{ color: scheme.text }}>
					Phone Number: {phoneNumberDB}
				</Text>
				<PhoneInput
					containerStyle={{
						backgroundColor: scheme.backgroundInput,
						borderColor: scheme.border,
						borderRadius: 10,
						borderWidth: 1,
						maxWidth: '80%',
						alignItems: 'center',
						marginBottom: 10,
						marginTop: 10,
					}}
					textContainerStyle={{
						backgroundColor: scheme.backgroundInput,
						borderRadius: 10,
						right: 25,
					}}
					textInputProps={{ placeholderTextColor: scheme.textPlaceholder }}
					codeTextStyle={{ color: scheme.text }}
					textInputStyle={{
						color: scheme.text,
					}}
					ref={phoneInput}
					defaultCode='PT'
					//placeholder={phoneNumber}
					layout='first'
					//value={phoneNumber}
					onChangeText={(text) => {
						setPhone(text);
					}}
					onChangeFormattedText={(text) => {
						setPhoneNumber(text);
					}}
					withShadow
					withDarkTheme={scheme.darkTheme}
					disableArrowIcon
				/>
			</SafeAreaView>
			<TouchableOpacity
				onPress={saveData}
				style={[theme.button, { backgroundColor: scheme.button }]}
			>
				<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
					Update
				</Text>
			</TouchableOpacity>
			<SafeAreaView
				style={[
					theme.buttonContainer,
					{
						flexDirection: 'row',
						alignItems: 'flex-end',
						top: 50,
					},
				]}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('SettingsTab');
					}}
					style={[theme.button, { backgroundColor: scheme.button }]}
				>
					<Text style={[theme.buttonText, { color: scheme.buttonText }]}>
						Back
					</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Home;
