import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBOZBD4acwyzIOTP6WcOuGLOHs4sySRTro',
  authDomain: 'recettes-app-e118c.firebaseapp.com',
  databaseURL: 'https://recettes-app-e118c.firebaseio.com'
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }

export default base
