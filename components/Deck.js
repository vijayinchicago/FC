import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'

class Deck extends Component {
  // This wont show for some reason.
  // I believe this because of npm's version of react-navigation.
  // This actually works when built, but not in emulators.
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    
    return {
      title: deck
    }
  }
  
  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.text}>{deck.questions.length>0 ? deck.questions.length : "No"} cards</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'AddCard',
            { deck: deck.title }
        )}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => this.props.navigation.navigate(
            'CardQuiz',
            { deck: deck.title }
        )}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }) {
  const { deck } = navigation.state.params
  
  return {
    deck: state[deck]
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    marginLeft: 10,
    fontSize: 20
  },
  button: {
    margin: 10,
    fontSize: 20,
    backgroundColor: '#0e74ce',
    padding: 10,
    alignItems: 'center',
    borderRadius: 3
  }, 
  buttonText: {
    color: '#FFFFFF'
  }
})

export default connect(mapStateToProps)(Deck)