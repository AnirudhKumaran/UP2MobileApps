import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container:{
      marginTop: 5,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'center',
      flex: 1
    },
    input: {
      height: 30,
      width: '90%',
      padding: 4,
      marginBottom: 7,
      marginTop: 7,
      fontSize: 14,
    },
    del_button : {
      padding: 10,
      borderRadius: 5,
      margin: 7,
      backgroundColor: '#960018'
    },
    res_button : {
      padding: 10,
      borderRadius: 5,
      margin: 7,
      backgroundColor: 'green'
    },
    add_button : {
      padding: 10,
      borderRadius: 5,
      margin: 7,
      backgroundColor: '#00BCD4'
    },
    textStyle: {
      color: '#fff',
      textAlign: 'center',
    },
    button_container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      marginTop:7,
      marginBottom: 7,
    },
    text_container:{
      flexDirection: 'row',
      marginTop:2,
      marginBottom: 2,
    },
    buttons: {
      flex: 1,
      margin:7,
    },
    ImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'contain',
    },
    listview:{
      flex: 2,
      width: '90%'
    },
    listitem:{
      marginBottom:5,
      marginTop: 5,
      height: 70,
      padding:5,
      paddingLeft:10,
      paddingRight: 10,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#fff',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 25 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    }
  })