// "Dark" means "for Dark Mode", not that it is dark in color
// "Light" means "for Light Mode", not that it is light in color
// Redo at some point

const colors = {
	dark: {
		background: '#070707',
		backgroundInput: '#353535',
		text: '#ffffff',
		textPlaceholder: '#6a6e70',
		border: '#ffffff',
		button: '#aa0505',
		buttonDisabled: '#5b0000',
		buttonText: '#ffffff',
		buttonTextDisabled: '#4e5051',
		buttonIcon: '#ffffff',
		bottomBarBackground: '#141414',
		bottomBarText: '#ffffff',
		highlight: '#aa0505',
		grey: '#353535',
		error: '#aa0505',
		statusBar: 'light',
		darkTheme: true,
	},
	light: {
		background: '#ffffff',
		backgroundInput: '#ffffff',
		text: '#000000',
		textPlaceholder: '#6a6e70',
		border: '#000000',
		button: '#000000',
		buttonDisabled: '#000000',
		buttonText: '#ffffff',
		buttonTextDisabled: '#4e5051',
		buttonIcon: '#000000',
		bottomBarBackground: '#000000',
		bottomBarText: '#ffffff',
		highlight: '#ffffff',
		grey: '#6d6d6d',
		error: '#aa0505',
		statusBar: 'dark',
		darkTheme: false,
	},
};

export default colors;
