import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, List, TextInput} from 'react-native-paper';
import COLORS from '../../Assets/Style/Color';
const Contact = () => {
  const [name, setName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [site, setSite] = React.useState('');
  const [issue, setIssue] = React.useState('');
  const [value, setValue] = React.useState('');

  const handleSubmit = () => {

  };

  const handlePress = () => {
    setExpanded(!expanded);
  };

  const handleOptionPress = option => {
    setSelectedOption(option);
    setExpanded(false);
  };

  const [selectedOption, setSelectedOption] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handlePress1 = () => {
    setExpanded1(!expanded);
  };

  const handleOptionPress1 = option => {
    setSelectedOption1(option);
    setExpanded1(false);
  };

  const [selectedOption1, setSelectedOption1] = useState('');
  const [expanded1, setExpanded1] = useState(false);

  return (
    // <SafeAreaView>
    <ScrollView style={{flex: 1, marginBottom: 50}}>
      <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
        <View style={styles.headerBox}>
          <Image
            style={styles.imgStyle}
            source={require('../../Assets/Images/contact/contact.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.box}>
          <TextInput
            label="firstName"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            label="LastName"
            value={lname}
            onChangeText={setLName}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            label="Mobile No"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
            secureTextEntry
          />
          <View style={{marginVertical: '1%', marginRight: '15%'}}>
            <List.Section>
              <List.Accordion
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                title={selectedOption ? selectedOption : 'Site'}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  title={'Admin'}
                  onPress={() =>
                    handleOptionPress('Admin')
                  }
                />
              </List.Accordion>
            </List.Section>
          </View>
          <View style={{marginVertical: '1%', marginRight: '15%'}}>
            <List.Section>
              <List.Accordion
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}
                title={selectedOption1 ? selectedOption1 : 'Technical MenuItem'}
                expanded={expanded1}
                onPress={handlePress1}>
                <List.Item
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                  title={'Network Problem'}
                  onPress={() =>
                    handleOptionPress1('Network Problem')
                  }
                />
              </List.Accordion>
            </List.Section>
          </View>
          <TextInput
            label="Type your message here"
            value={value}
            onChangeText={text => setValue(text)}
            multiline
            numberOfLines={5}
            style={styles.textInput}
          />
          <Button
            style={{
              backgroundColor: 'black',
              color: COLORS.white,
              width: '85%',
              marginTop: '4%',
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
          </Button>
        </View>
        <View></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f6f6f6',
  },
  imgStyle: {
    height: 100,
    width: '60%',
    borderRadius: 50,
  },
  box: {
    height: 650,
    width: '100%',
    backgroundColor: '#f0eef3',
    marginTop: '5%',
    borderRadius: 55,
    paddingLeft: '13%',
    paddingTop: '6%',
  },
  input: {
    marginBottom: 16,
    height: 50,
    backgroundColor: '#fff',
    width: '85%',
  },
  textInput: {
    backgroundColor: '#fff',
    width: '85%',
    height: 120,
  },
});

export default Contact;
