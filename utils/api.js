import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const STORAGE_KEY = 'StorageKey:flashcards'

const DEFAULT_STATE = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}


export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY).then((response) => { 
    return JSON.parse(response) 
  })
}


export function getDeck (id) {
    
}


export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    } 
  }))
}


export function addCardToDeck (title, card) {
  AsyncStorage.getItem(STORAGE_KEY).then((response) => {
    const data = JSON.parse(response)
    const questions = data[title].questions
    questions.push(card)
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [title]: {
        title: title,
        questions: questions
      }      
    }))
  })
}


const NOTIFICATION_KEY = 'Flashcards:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Take a Quiz!',
    body: "👋 don't forget to take a quiz today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(13)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}