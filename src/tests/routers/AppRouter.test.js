import { mount } from "enzyme"
import { Provider } from "react-redux"
import { AppRouter } from "../../routers/AppRouter"

import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"

import {firebase} from '../../firebase/firebase-config'

import { login } from "../../actions/auth"
import { act } from "@testing-library/react"
import { MemoryRouter } from "react-router"

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: null,
    notes: []
  }
}

const store = mockStore(initialState)
store.dispatch = jest.fn()


describe('Pruebas en <AppRouter />', () => {
  
  test('debe de llamar el login si estoy autenticado', async() => {
    
    let user

    await act(async() => {

      const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456')
      user = userCred.user

      const wrapper = mount(
        <Provider store={store} >
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      )
    })

    expect(login).toHaveBeenCalled()
    expect(login).toHaveBeenCalledWith('e2l7gDnSBcYxaM2CRarhY6KsdEp2', null)
    
  })
  
})
