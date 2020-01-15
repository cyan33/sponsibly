// @flow
import * as firebase from 'firebase'
import 'firebase/firestore';

import { getExactTimeStamp } from './utils'
import { Log, User, LoginType } from './types'

type Records = {
  id?: string
}

type Observer<T> = (records: Array<T>) => void

class Store<T: Records> {
  _observers: Array<Observer<T>> = []
  _uid: string
  _entriesRef: any
  _category: string
  data: Array<T> = []

  constructor(uid: string, category: string, entriesRef: any) {
    this._uid = uid
    this._entriesRef = entriesRef
    this._category = category
    this.saveRecord = this.saveRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
    this.getRecord = this.getRecord.bind(this)

    this._entriesRef
      .where('$category', '==', category)
      .where('user', '==', uid)
      .orderBy('date', 'desc')
      // .limit(40)
      .onSnapshot(this.onSnapshot);
  }

  registerObserver = (observer: Observer<T>): void => {
    this._observers.push(observer)
  }

  getRecord = (id: string): Promise<any> => {
    return this._entriesRef.doc(id).get().then(log => log.data())
  }

  deleteRecord = (id: string): Promise<any> => {
    return this._entriesRef.doc(id).delete()
  }

  saveRecord = (record: Log): Promise<any> => {
    const { id, ...rest } = record
    const data = {
      ...rest,
      $category: this._category,
      user: this._uid
    }
    return id ? this._entriesRef.doc(id).set(data)
              : this._entriesRef.add(data)
  }

  sortLogs = (): void => {
    this.data.sort((a, b) => {
      return getExactTimeStamp(b) - getExactTimeStamp(a)
    })
  }

  onSnapshot = (snapshot: any) => {
    snapshot.docChanges().forEach((change: any) => {
      if (change.type === 'added') {
        this.data.unshift({
          ...change.doc.data(),
          id: change.doc.id
        })
      } else if (change.type === 'modified') {
        const changedLog = this.data.find((log) => log.id === change.doc.id)
        const changedIndex = this.data.indexOf(changedLog)
        this.data[changedIndex] = {
          ...change.doc.data(),
          id: change.doc.id
        }
      } else if (change.type === 'removed') {
        this.data = this.data.filter((log) => {
          return log.id !== change.doc.id
        })
      }
    })
    this.sortLogs()
    this._observers.forEach((observer: Observer<T>) => observer(this.data))
  }
}

export default class DataStore {
  _auth = null
  _entriesRef = null
  loggingStore: Store<Log>
  user: User

  constructor() {
    if (!firebase.apps.length) {
      var firebaseConfig = {
        apiKey: "AIzaSyDRfKuME4yRRhSC6CzpvlgGE5TpsIMRQxk",
        authDomain: "spendresponsibly.firebaseapp.com",
        databaseURL: "https://spendresponsibly.firebaseio.com",
        projectId: "spendresponsibly",
        storageBucket: "spendresponsibly.appspot.com",
        messagingSenderId: "798883008011",
        appId: "1:798883008011:web:325505832e21baea39c10e",
        measurementId: "G-PMJKLV03V8"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    }
  }

  get auth(): any {
    return this._auth ? this._auth : firebase.auth()
  }

  checkAuth(): Promise<User> {
    return new Promise((resolve, reject) => {
      this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      this.auth.onAuthStateChanged(user => {
        if (user) {
          const db = firebase.firestore();

          this._entriesRef = db.collection('entries')

          this.user = user
          const { uid } = user

          this.loggingStore = new Store(uid, 'logs', this._entriesRef)

          resolve(this)
        } else {
          reject()
        }
      })
    })
  }

  login = (type: LoginType): void => {
    let provider
    
    switch(type) {
      // case 'github':
      //   provider = new firebase.auth.GithubAuthProvider()
      //   break
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider()
        break
      default:
        throw Error(`Unexpected login type: ${type}`)
    }
    this.auth.signInWithRedirect(provider);
  }

  signOut = () => firebase.auth().signOut()
}
