import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import AddDeck from './components/AddDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import ListDecks from './components/ListDecks'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { StatusBar } from 'react-native';
import { Constants } from 'expo'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import CardQuiz from './components/CardQuiz'
import { setLocalNotification } from './utils/api'

function FlashcardsStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  ListDecks: {
    screen: ListDecks,
    navigationOptions: {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#292477'
      },
      tabBarLabel: 'Decks'
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#292477'
      },
      tabBarLabel: 'Add Deck'
    }
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#292477' : '#FFFFFF',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? '#FFFFFF' : '#292477'
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#203e6d'
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: '#FFFFFF',
      title: 'Add Card',
      headerStyle: {
        backgroundColor: '#247077'
      }
    }
  },
  CardQuiz: {
    screen: CardQuiz,
    navigationOptions: {
      headerTintColor: '#FFFFFF',
      title: 'Quiz',
      headerStyle: {
        backgroundColor: '#292477'
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    //setLocalNotification()  
  }
  
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <FlashcardsStatusBar backgroundColor='#083a8c' barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
