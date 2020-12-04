import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black",
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    
   
  },
  header: {
    backgroundColor: '#4b81e7',
    height:'80%',
    width:'90%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: '5%',
    borderRadius: 10,
    fontFamily: 'RedHatText_Regular',
    flexDirection: 'column',

  },
  headerTitle: {
    color: "white",
    alignSelf: "center",
    
    
  },
  header1: {
    backgroundColor: '#242835',
    alignSelf: 'center',
    color: 'white',
    fontSize: 25,
    marginTop: '5%',
    top: "-5%",
    marginBottom: '5%',
    textAlign: 'center',
    borderRadius: 10,
    width: '90%',
    height: '60%',
    textAlignVertical: 'center',
    fontFamily: 'RedHatText_Regular',
},
  title: {
    flex: 1,
    color: "#ffff57",
    fontSize: 35,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
    fontFamily: 'RedHatText_Regular'
  },
  
  picker: {
    backgroundColor: "white",
    margin: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    fontFamily: 'RedHatText_Regular'
  },
  pickerItem: {
    backgroundColor: "red",
  },
  label: {
    marginTop: 10,
  },
  error: {
    color: "red",
    fontFamily: 'RedHatText_Regular'
  },
  card: {
    flex: 8,
    justifyContent: "center",
    
  },
  textArea: {
    width: 275,
    marginBottom: 10,
   
    
  },
  buttom: {
    width: '90%',
    alignSelf: 'center',
    top: 30,
    justifyContent: 'center',
    backgroundColor: '#4b81e7',
    borderRadius: 10,
  },
  imageContainerCU: {
    height: '100%',
    top: '6%'
},

  main1:{
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
    fontFamily: 'RedHatText_Regular',
    
  },
  main2:{
    flex: 2,
    padding: 15,
    marginHorizontal:20,
    
  },
  input:{
      color:'#171717'
  },

  image:{
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  infoContainer: {
    backgroundColor: 'white',
    width: '100%',
    height:'100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    fontFamily: 'RedHatText_Regular',
    
},
space: {
  top: 40,
},
});