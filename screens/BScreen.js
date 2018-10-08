 import React from 'react';
import { StyleSheet, Button, Alert } from 'react-native';
import { Container, Input, Item, Content, Textarea, Form, ListItem, CheckBox, Body, Text, Radio, Right, Left } from "native-base";

export default class App extends React.Component {

  constructor() {
 
    super()
 
    this.state = {
 
      Text: '',
      Textarea: ''
 
    }
 
  }

  InsertFunction = () =>{
 
    fetch('http://192.168.0.105/User_Project/insert.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        text: this.state.Text,
    
        textarea: this.state.Textarea
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
   
  }

  DeleteFunction = () =>{
 
    fetch('http://192.168.0.105/User_Project/delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        text: this.state.Text,
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
   
  }

  UpdateFunction = () =>{
 
    fetch('http://192.168.0.105/User_Project/update.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        text: this.state.Text,

        textarea: this.state.Textarea
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
   
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>

            <Item regular>
              <Input placeholder='Textbox' onChangeText={text => this.setState({Text : text})} />
            </Item>

            <Textarea rowSpan={5} bordered placeholder="Textarea" onChangeText={textarea => this.setState({Textarea : textarea})} />

            <ListItem>
              <Left>
                <Text>RB Choice A</Text>
              </Left>
              <Right>
                <Radio selected={false} />
              </Right>
            </ListItem>

            <ListItem>
              <Left>
                <Text>RB Choice B</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
            </ListItem>

            <ListItem>
            <CheckBox checked={true} />
            <Body>
              <Text>CB Choice A</Text>
            </Body>
            </ListItem>
            
            <ListItem>
              <CheckBox checked={false} />
              <Body>
                <Text>CB Choice B</Text>
              </Body>
            </ListItem>

            <ListItem>
              <CheckBox checked={false} />
              <Body>
                <Text>CB Choice C</Text>
              </Body>
            </ListItem>
            
            <Button title="Insert" onPress={this.InsertFunction} color="#2196F3" />
            <Button title="Update" onPress={this.UpdateFunction} color="#2196F3" />
            <Button title="Delete" onPress={this.DeleteFunction} color="#2196F3" />

          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
  MainContainer :{
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

  TextAreaStyleClass: {
    textAlign: 'center',
    height: 80,
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