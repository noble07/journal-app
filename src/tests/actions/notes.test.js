/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes'
import { types } from '../../types/types'
import { db } from '../../firebase/firebase-config'

import { fileUpload } from '../../helpers/fileUpload'

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: () => {
    return Promise.resolve('https://hola-mundo.com/cosa.jpg')
  }
}))
 
const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {
    uid: 'TESTING',
    name: 'Juan'
  },
  notes: {
    active: {
      id: 'vghZIDGBLUmKOV9DQPHv',
      title: 'Hola',
      body: 'Mundo'
    }
  }
}

let store

describe('Pruebas con las acciones de notes', () => {

  beforeEach(() => {
    store = mockStore(initState)
  })

  afterAll(() => {
    db.disableNetwork()
  })
  
  test('debe de crear una nueva nota startNewNote', async() => {

    await store.dispatch(startNewNote())

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number)
      }
    })

    const docId = actions[0].payload.id
    await db.doc(`/TESTING/journal/notes/${ docId }`).delete();

  })

  test('startLoadingNotes debe cargar las notas', async() => {
    
    await store.dispatch(startLoadingNotes('TESTING'))

    const action = store.getActions()

    expect(action[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    })

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number)
    }

    expect(action[0].payload[0]).toMatchObject(expected)

  })

  test('startSavedNote debe de actualizar la nota', async() => {
    
    const note = {
      id: 'vghZIDGBLUmKOV9DQPHv',
      title: 'titulo',
      body: 'body'
    }

    await store.dispatch( startSaveNote(note) )

    const actions = store.getActions()

    expect(actions[0].type).toBe(types.notesUpdated)
    
    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get()

    expect(docRef.data().title).toBe(note.title)

  })

  test('startUploading debe de actualizar el url del entry', async() => {
    const file = []

    await store.dispatch(startUploading(file))

    const docRef = await db.doc('/TESTING/journal/notes/vghZIDGBLUmKOV9DQPHv').get()


    expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg')

  })

})
