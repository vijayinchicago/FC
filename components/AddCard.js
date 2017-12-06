import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
    
  handleSubmit = () => {
    const { deck } = this.props.navigation.state.params
    this.props.dispatch(addCard(
      deck, this.state
    ))
    
    addCardToDeck(deck, this.state) //add to storage
    
    this.props.navigation.goBack()
    
    this.setState(() => ({
      question: '',
      answer: ''
    }))    
  }
  
  handleQuestionTextChange = (textValue) => {
    this.setState(() => ({ question: textValue }))
  }

  handleAnswerTextChange = (textValue) => {
    this.setState(() => ({ answer: textValue }))
  }  
    
  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.container}>
        <Text style={styles.title}>Please enter the question followed by the answer</Text>
        <TextInput
          style={styles.input}
          value={question}
          placeholder='Question'
          onChangeText={this.handleQuestionTextChange}
        />
        <TextInput
          style={styles.input}
          value={answer}
          placeholder='Answer'
          onChangeText={this.handleAnswerTextChange}
        />        
        <TouchableOpacity 
          style={styles.button}
          onPress={this.handleSubmit} >
          <Text style={styles.buttonText}>Create Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    margin: 10,
    fontSize: 16
  },
  text: {
    marginLeft: 10,
    fontSize: 14
  },
  button: {
    margin: 10,
    fontSize: 14,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2
  }, 
  buttonText: {
    color: '#FFFFFF'
  },
  input: {
    height: 50,
    padding: 10,
    margin: 10
  }
})

export default connect()(AddCard)