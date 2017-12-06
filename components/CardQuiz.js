import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/api'

class CardQuiz extends Component {
  state = {
    cardIndex: 0,
    numberCorrect: 0,
    showAnswer: false
  }
  
  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }
  
  handleAnswerToggle = () => {
    // Toggle between the question and answer.
    this.setState((state) => ({
      showAnswer: !state.showAnswer
    }))
  }

  handleCorrect = () => {

    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      numberCorrect: state.numberCorrect + 1,
      showAnswer: false
    }))    
  }
  
  handleIncorrect = () => {
    this.setState((state) => ({
      cardIndex: state.cardIndex + 1,
      showAnswer: false
    }))    
  }  
    
  render() {
    const { cardIndex, numberCorrect, showAnswer } = this.state
    const { deck } = this.props
    
    return (
      <View style={styles.container}>
        {deck.questions.length > cardIndex ?
          <View>
            <Text style={styles.count}>Question {cardIndex + 1} of {deck.questions.length}</Text>
            {showAnswer === true ?
              <Text style={styles.title}>{deck.questions[cardIndex].answer}</Text>
            : 
              <Text style={styles.title}>{deck.questions[cardIndex].question}</Text>
            }          
            <TouchableOpacity 
              style={styles.button}
              onPress={this.handleAnswerToggle} >
              <Text style={styles.buttonText}>Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonGreen}
              onPress={this.handleCorrect}
              backgroundColor="green" >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonRed}
              onPress={this.handleIncorrect} 
              backgroundColor="red">
              <Text style={styles.buttonText}>Incorrect</Text>
            </TouchableOpacity>   
          </View>
        :
          <View style={styles.centerContainer}>
            <Text style={styles.center}>{(numberCorrect / deck.questions.length * 100).toFixed(2)}% Correct!</Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => this.props.navigation.navigate(
                'Deck',
                { deck: deck.title }
              )}
            >
              <Text style={styles.buttonText}>Return to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
               onPress={() => this.props.navigation.navigate(
                'CardQuiz',
                { deck: deck.title }
              )}
            >
              <Text style={styles.buttonText}>Restart Quiz</Text>
            </TouchableOpacity>            
          </View>
        }
      </View>
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
    fontSize: 40
  },
  text: {
    marginLeft: 10,
    fontSize: 14
  },
  button: {
    margin: 70,
    fontSize: 14,
    padding: 10,
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: 'purple'
  },
  buttonGreen: {
    margin: 10,
    fontSize: 18,
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2
  },
  buttonRed: {
    margin: 10,
    fontSize: 18,
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    borderRadius: 2
  }, 
  buttonText: {
    color: '#FFFFFF'
  },
  center: {
    fontSize: 16,
    textAlign: 'center'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center'
  }
})

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params
  
  return {
    deck: state[deck]
  }
}

export default connect(mapStateToProps)(CardQuiz)