import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { AuthSession } from 'expo';

const FB_APP_ID = '662712260774949'; 

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      result: null,
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }

  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "634769216206-uk1jfa6cdple9hkf6c8n30aki0deimt0.apps.googleusercontent.com",
        iosClientId: 
          "634769216206-uk1jfa6cdple9hkf6c8n30aki0deimt0.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    return (
      
      <View style={styles.MainContainer}>

        <Text style= {styles.title}>User Login Form</Text>

          <TextInput
          placeholder="Enter User Name"
          onChangeText={name => this.setState({UserName : name})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          />
 
        <TextInput
          placeholder="Enter User Password"
          onChangeText={password => this.setState({UserPassword : password})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
          />

        <Button title="Login" onPress={this._handlePressAsync} color="#2196F3" />

        <Button title="Open FB Auth" onPress={this._handlePressAsync} />

        <Button title="Sign in with Google" onPress={() => this.signIn()} />

        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
        </View>
    );
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result });
  };
}



const styles = StyleSheet.create({
  
  MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 10
  },
   
  TextInputStyleClass: {
   
    textAlign: 'center',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#2196F3',
    borderRadius: 5 ,
  },
  
  title:{
  
    fontSize: 22, 
    color: "#009688", 
    textAlign: 'center', 
    marginBottom: 15
  }
});