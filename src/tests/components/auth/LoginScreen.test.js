import { mount } from "enzyme"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth"

import { LoginScreen } from "../../../components/auth/LoginScreen"
jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}))


const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
}

let store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store} >
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })  

  test('debe de mostrar el componente correctamente', () => {
    
    expect(wrapper).toMatchSnapshot()
    
  })
  
  test('debe de disparar la acción de startGoogleLogin', () => {
    
    wrapper.find('.google-btn').simulate('click')

    expect(startGoogleLogin).toHaveBeenCalled()

  })

  /* {
    email: 'juan@gmail.com',
    password: '123456'
  } */
    
  test('debe de disparar el startLoginEmailPassword con los respectivos argumentos', () => {
    
    wrapper.find('form').simulate('submit')

    expect(startLoginEmailPassword).toHaveBeenLastCalledWith('juan@gmail.com', '123456')

  })
  

})
