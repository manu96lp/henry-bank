import { StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	container:
	{
		backgroundColor: "#f3f3f3"
	},
	
	header: {
		alignSelf: "center",
		width: "90%",
		marginTop: 20,
		marginBottom: 25,
		padding: 7,
		borderRadius: 10,
		backgroundColor: "#242835"
	},
	
	headerText:
	{
		color: "white",
		fontSize: 25,
        fontFamily: 'RedHatText_Regular',
		textAlign: "center"
	},
	
	subHeaderText:
	{
		position: "absolute",
		top: 45,
		alignSelf: "center",
		color: "white",
		textTransform: "uppercase",
		fontSize: 13,
		fontWeight: "bold",
		textAlign: "center"
	},
	
	button:
	{
		alignSelf: "center",
		width: "100%",
		maxWidth: 298,
		marginBottom: 15,
		borderRadius: 10
		,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6
	},
	
	buttonText:
	{
		fontSize: 17,
		fontWeight: "bold",
		textTransform: "uppercase"
	},
	
	scanButton:
	{
		backgroundColor: "#8b40ed",
	},
	
	scanButtonText:
	{
		color: "#ddd",
	},
	
	rechargeButton:
	{
		backgroundColor: "#4b81e7",
	},
	
	rechargeButtonText:
	{
		color: "#eee",
	},
	
	cameraIcon:
	{
		marginRight: 10,
		fontSize: 22,
		color: "#fff"
	},
	
	amountContainer:
	{
		alignSelf: "center",
		width: "100%",
		maxWidth: 300,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 45,
		marginBottom: 30,
		borderRadius: 20,
		backgroundColor: "#4b81e7"
	},
	
	amountLabel:
	{
		alignSelf: "center",
		marginTop: 10,
		fontSize: 17,
		fontWeight: "bold",
		color: "#fff"
	},
	
	amountItem:
	{
		marginTop: 15,
		marginBottom: 15,
		marginLeft: 15,
		marginRight: 15,
		overflow: "hidden"
	},
	
	amountItemInput:
	{
		paddingRight: 10,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "right",
		color: "#333",
		backgroundColor: "#f3f3f3"
	},
	
	amountItemLabel:
	{
		textAlignVertical: "center",
		paddingRight: 15,
		paddingLeft: 15,
		height: "100%",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: "#fff",
		backgroundColor: "#1451c4"
	}
} );

export default styles;