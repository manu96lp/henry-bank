
export default {
button: {
  
  marginTop: '10%',
  color: '#4b81e7',
  fontFamily: 'RedHatText_Regular',
  fontSize: 18
},
title: {
  marginTop: '2%',
  textAlign: 'center',
  color: '#707B7C',
  fontSize: 23,
  fontFamily: 'RedHatText_Regular',
},

header: {
  backgroundColor: '#242835',
  alignSelf: 'center',
  color: 'white',
  fontSize: 25,
  marginTop: '5%',
  marginBottom: '5%',
  textAlign: 'center',
  borderRadius: 10,
  width: '90%',
  height: '10%',
  textAlignVertical: 'center'
},

buttonsContainer: {
  margin:10,
  alignItems:"center",
  height: 50,
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: '5%'
},

modalAdd:{
  padding:10,
  borderRadius:10,
  backgroundColor:"white",
},
modalDelete:{
  padding:10,
  borderRadius:10,
  backgroundColor:"white",
},

  item:{
    width: "95%",
    borderRadius:10,
    alignSelf: "center",
    marginTop: "1%",
    marginBottom: "1%",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.5,
    elevation: 4,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  
  rowBack: {
    width: "94%",
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent:"space-between",
    marginTop: 5,
    marginBottom: 5,
  },
  BtnLeft:{
    marginLeft:"6%",
    borderRadius:10,
    alignItems: 'center',
    width:75,
    backgroundColor:"#4b81e7",
    left: 0,
    height:"100%",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  BtnRight: {
    borderRadius:10,
    alignItems: 'center',
    width:75,
    backgroundColor: '#EA5959',
    right: 0,
    height:"100%",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  
  addButton: {
    width: 65,
    height: 65,
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    backgroundColor:"#4b81e7",
    shadowColor: "#0000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation:5
  },
  addButton2: {
    width: 65,
    height: 65,
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left:20,
    backgroundColor:"#000000",
    shadowColor: "#0000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation:5
  },

  addUser:{
    left:-2,
    color:"white",
    textAlign: 'center',
        shadowOpacity: 2,
        textShadowRadius: 4,
        textShadowOffset: { width: 0, height: 3 }
  },
}