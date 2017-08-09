import React from 'react';
import {
	Text,
	TextInput,
	StyleSheet,
	View,
	Theme,
} from '../../components/ui-components/';
import { Image } from 'react-native';
import { authSuccess } from '../../redux/actions/auth';
import _ from 'lodash';
import AuthRequestComponent from '../screen-components/AuthRequestComponent';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: '10%',
	},
	brandRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	brandTextContainer: {
		marginHorizontal: Theme.marginNormal,
	},
	logo: {
		alignSelf: 'flex-start',
		width: 140,
		height: 140,
	},
	ekkaText: {
		fontSize: Theme.h3,
	},
	worldText: {
		fontSize: Theme.h5,
	},
	welcomeText: {
		fontSize: Theme.h3,
	},
	amazingAppsText: {
		fontSize: Theme.h4,
		marginTop: Theme.marginNormal,
	},
	craftedText: {
		fontSize: Theme.h4,
		marginBottom: Theme.marginExtraLarge,
	},
	textInput: {
		marginBottom: Theme.marginLarge,
	},
	error: {
		color: Theme.errorMessageColor,
		marginBottom: Theme.marginLarge,
	},
	buttonContainer: {
		flexDirection: 'row',
		height: 40,
		justifyContent: 'space-between',
		marginTop: Theme.marginLarge,
	},
	button: {
		width: '45%',
	},
});

export default class AuthScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

	onAuthSuccessful = data => {
		this.setState({ authError: false });
		this.props.dispatch(authSuccess(data));
	};

	onAuthFailed = data => {
		this.setState({ authError: true, errorMessage: data.message });
	};

	onEmailChange = email => {
		this.setState({
			email: _.trim(email),
		});
	};

	onPasswordChange = password => {
		this.setState({
			password: _.trim(password),
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.brandRow}>
					<Image
						source={require('../../assets/images/EkkaLogo.png')}
						resizeMode={'contain'}
						style={styles.logo}
					/>
					<View style={styles.brandTextContainer}>
						<Text style={styles.ekkaText}>EKKA</Text>
						<Text numberOfLines={1} style={styles.worldText}>
							World is your wokplace
						</Text>
					</View>
				</View>
				<Text style={styles.welcomeText}>
					{'Welcome'}
				</Text>
				<Text style={styles.amazingAppsText}>
					{'Discover amazing apps,'}
				</Text>
				<Text style={styles.craftedText}>
					{'specially crafted for your taste.'}
				</Text>
				<TextInput
					placeholder="Email"
					keyboardType="email-address"
					autoFocus={true}
					onChangeText={this.onEmailChange}
					wrapperStyle={styles.textInput}
					value={this.state.email}
				/>
				<TextInput
					placeholder="Password"
					secureTextEntry={true}
					onChangeText={this.onPasswordChange}
					wrapperStyle={styles.textInput}
					value={this.state.password}
				/>
				{this.state.authError &&
					<Text style={styles.error}>
						{this.state.errorMessage}
					</Text>}
				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<AuthRequestComponent
							buttonText="Login"
							systemProcessName="login"
							email={this.state.email}
							password={this.state.password}
							onAuthSuccessful={this.onAuthSuccessful}
							onAuthFailed={this.onAuthFailed}
						/>
					</View>
					<View style={styles.button}>
						<AuthRequestComponent
							buttonText="Signup"
							systemProcessName="wf__register"
							email={this.state.email}
							password={this.state.password}
							onAuthSuccessful={this.onAuthSuccessful}
							onAuthFailed={this.onAuthFailed}
						/>
					</View>
				</View>
			</View>
		);
	}
}
