import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Platform, Alert } from "react-native";
import { Button, Content, Container, Item, Input, Label } from "native-base";
import { CreditCardInput } from "react-native-credit-card-input";
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axios from "axios";

import { rechargeCard } from "../../redux/actions/transactions.js";
import { refresh } from "../../redux/actions/userActions.js";

import styles from "./styles.js";

function RechargeWithCard( { navigation } )
{
	const [ amount, setAmount ] = useState( "" );
	const [ cardData, setCardData ] = useState( null );
	const [ scanAvailable, setScanAvailable ] = useState( false );
	
	const creditCardInput = useRef( null );
	
	const user = useSelector( ( state ) => state.userReducer );
	const dispatch = useDispatch( );

	const handleRechargeButton = async ( event ) => {
		if ( !cardData.valid ) {
			Alert.alert( 
				"Datos incompletos",
				"Aún no has introducido una tarjeta válida"
			);
			
			return;
		}
		
		if ( amount <= 1 ) {
			Alert.alert( 
				"Datos incompletos",
				"Aún no has introducido un monto válido"
			);
			
			return;
		}
		
		dispatch( rechargeCard( { id: user.idAccount, amount } ) );
		dispatch( refresh( user.id ) );
		
		Alert.alert( 
			"Recarga exitosa",
			`Has recargado correctamente $${ amount } ARS`
		);
	};
	
	const handleScanButton = async ( event ) => {
		if ( !scanAvailable ) {
			return;
		}
		
		const options = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1.0,
			allowsEditing: false
		};
		
		ImagePicker.launchCameraAsync( options )
			.then( ( response ) => {
				if ( response.cancelled ) {
					throw new Error( "Cancelled" );
				}
				
				return ImageManipulator.manipulateAsync(
					response.uri,
					[ { resize: { width: 800 } } ],
					{ format: ImageManipulator.SaveFormat.JPG }
				);
			} )
			.then( ( response ) => {
				if ( !response ) {
					throw new Error( "Manipulate error" );
				}
				
				const formData = new FormData( );
				
				formData.append( "OCREngine", "2" );
				formData.append( "filetype", "JPG" );
				formData.append( "file", {
					name: Date.now( ).toString( ) + ".jpg",
					type: "image/jpeg",
					uri: response.uri
				} );
				
				return axios.post( "https://api.ocr.space/parse/image", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
						"apikey": "d85ac2d9ed88957"
					}
				} );
			} )
			.then( ( response ) => {
				if ( !response || ( response.data.OCRExitCode !== 1 ) ) {
					throw new Error( "OCR error" );
				}
				
				const data = ParseResponse( response.data.ParsedResults[ 0 ].ParsedText );
				
				if ( data.error ) {
					throw new Error( "OCR error" );
				}
				
				creditCardInput.current.setValues( data );
				creditCardInput.current.focus( "cvc" );
			} )
			.catch( ( error ) => {
				if ( error !== "Cancelled" ) {
					Alert.alert( 
						"Ocurrió un error",
						"Lo sentimos, no pudimos procesar la imagen"
					);
				}
			} );
	};
	
	const handleAmountInputChange = ( data ) => {
		setAmount( isNaN( data ) ? 0 : data );
	};
	
	const handleCreditCardChange = ( data ) => {
		setCardData( {
			number: data.values.number,
			expiry: data.values.expiry,
			cvc: data.values.cvc,
			valid: data.valid
		} );
	};
	
	useEffect( ( ) => {
		if ( Platform.OS === "web" ) {
			return;
		}
		
		ImagePicker.requestCameraRollPermissionsAsync( )
			.then( ( { granted } ) => {
				setScanAvailable( granted );
			} );
	}, [ ] );
	
	return (
		<Container style={ styles.container }>
			<Content>
				<View style={ styles.header }>
					<Text style={ styles.headerText }>Recarga con tarjeta</Text>
				</View>
				
				<Button disabled={ !scanAvailable } style={ [ styles.button, scanAvailable ? styles.scanButton : null ] } block onPress={ handleScanButton }>
					<Icon size={ 30 } name="camera" style={ styles.cameraIcon } />
					<Text style={ [ styles.buttonText, styles.scanButtonText ] }>Escanear tarjeta</Text>
				</Button>
				
				<CreditCardInput
					ref={ creditCardInput }
					allowScroll={ true }
					labelStyle={ { fontSize: 15 } }
					inputStyle={ { fontSize: 16 } }
					placeholderColor="#999"
					labels={ { number: "Número de tarjeta", expiry: "Expira", cvc: "CVC" } }
					onChange={ handleCreditCardChange }
				/>
				
				<View style={ styles.amountContainer }>
					<Text style={ styles.amountLabel }>MONTO A RECARGAR</Text>
					<Item rounded style={ styles.amountItem }>
						<Input
							placeholderColor="#999"
							keyboardType="decimal-pad"
							placeholder="Ingresar monto"
							style={ styles.amountItemInput }
							value={ amount }
							onChangeText={ handleAmountInputChange }
						/>
						<Label style={ styles.amountItemLabel }>ARS</Label>
					</Item>
				</View>
				
				<Button block style={ [ styles.button, styles.rechargeButton ] } onPress={ handleRechargeButton }>
					<Text style={ [ styles.buttonText, styles.rechargeButtonText ] }>Completar recarga</Text>
				</Button>
				
				<Button block style={ [ styles.button, styles.rechargeButton ] } onPress={ ( ) => navigation.navigate( 'Inicio' ) }>
					<Text style={ [ styles.buttonText, styles.rechargeButtonText ] }>Volver al inicio</Text>
				</Button>
			</Content>
		</Container>
	);
};

function ParseResponse( text )
{
	const lines = text.split( /\r?\n/ );
	
	if ( lines < 2 ) {
		return { error: true };
	}
	
	let cardNumber = "";
	let cardExpire = "";
	
	let current;
	let numbers;
	
	for ( let i = 0, j = 0 ; i < lines.length ; i++ ) {
		current = lines[ i ].replace( /\s/g, "" );
		
		if ( current.length === 16 ) {
			for ( j = 0 ; j < 16 ; j++ ) {
				if ( !isNaN( current[ j ] ) ) {
					continue;
				}
				
				switch ( current[ j ] ) {
					case "O": case "o":
						current[ j ] = 0; break;
					
					case "l":
						current[ j ] = 1; break;
					
					case "G": case "E": case "b":
						current[ j ] = 6; break;
					
					default: return { error: true };
				}
			}
			
			cardNumber = current;
		}
		else {
			if ( !lines[ i ].includes( "/" ) ) {
				continue;
			}
			
			lines[ i ].split( " " ).forEach( ( word ) => {
				current = word.replace( /[^\/\d]/g, "" );
				
				if ( ( current.length !== 5 ) || ( current[ 2 ] !== "/" ) ) {
					return;
				}
				
				numbers = current.split( "/" );
				
				if ( ( numbers.length !== 2 ) || numbers.some( ( v ) => isNaN( v ) ) ) {
					return;
				}
				
				try {
					if ( !cardExpire && ( Number( cardExpire.split( "/" )[ 1 ] ) > Number( numbers[ 1 ] ) ) ) {
						return;
					}
				}
				catch ( error ) {
					return;
				}
				
				cardExpire = current;
			} );
		}
	}
	
	if ( !cardNumber || !cardExpire ) {
		return { error: true };
	}
	
	const numberWithSpaces = [ ];
	
	for ( let i = 0 ; i < 4 ; i++ ) {
		numberWithSpaces.push( cardNumber.slice( ( i * 4 ), ( ( i + 1 ) * 4 ) ) );
	}
	
	return {
		number: numberWithSpaces.join( " " ),
		expiry: cardExpire
	};
}

export default RechargeWithCard;