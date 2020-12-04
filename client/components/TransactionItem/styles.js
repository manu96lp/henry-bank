export default {
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: '1%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alingItems: 'center',
    },
    infoContainer: {
        flexDirection: 'row'
    },
    subInfoContainer: {
      alignSelf: 'center'  
    },
    title: {
        fontSize: 16,
        fontFamily: 'RedHatText_Regular',
    },
    date: {
        color: 'grey',
        fontFamily: 'RedHatText_Regular',
        fontSize: 13
    },
    /*Positive balance*/
    amount: {
        color:'#2ECC71',
        fontSize: 18,
        fontFamily: 'RedHatText_Regular',
        fontWeight: '100',
        alignSelf: 'center' 
    },
    amountContainer: {
        borderRadius: 10,
        padding: 5,
        height: '70%',
        backgroundColor: 'rgba(130, 224, 170, .3)',
        alignSelf: 'center'
    },
    /*Negative balance*/
    amountNegative: {
        color:'#4b81e7',
        fontSize: 18,
        fontFamily: 'RedHatText_Regular',
        fontWeight: '100',
        alignSelf: 'center' 
    },  
    amountContainerNegative: {
        borderRadius: 10,
        padding: 5,
        height: '70%',
        backgroundColor: 'rgba(75, 129, 231, .3)',
        alignSelf: 'center'
    },
    //////////////////MODAL/////////////////
    modalContainer: {
        backgroundColor: 'white',
        width: '90%',
        height: '75%',
        alignSelf: 'center',
        marginTop: '5%',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    modalTitleText: {
        fontSize: 35,
        alignSelf: 'center',
        marginBottom: '5%',
        color: 'grey',
        fontFamily: 'RedHatText_Regular',
    },
    properties: {
        fontSize: 18,
        marginLeft: '5%',
        fontFamily: 'RedHatText_Regular',
    },
    icon: {
        textAlign: 'right',
        marginRight: '2%',
        marginTop: '2%'
    },
    animation: {
        marginTop: '27%'
    }
}