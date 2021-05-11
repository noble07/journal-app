import { mount } from "enzyme"
import { Provider } from "react-redux"
import { RegisterScreen } from "../../../components/auth/RegisterScreen"
import { MemoryRouter } from "react-router"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { types } from "../../../types/types"

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let initialState = {
  ui: {
    msgError: null
  }
}

let store = mockStore(initialState)

let wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('Pruebas en <RegisterScreen />', () => {

  test('debe de mostrarse correctamente', () => {
    
    expect(wrapper).toMatchSnapshot()

  })

  test('debe de hacer el dispatch de la acción respectiva', () => {
    
    const emailField = wrapper.find('input[name="email"]')

    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email'
      }
    })

    wrapper.find('form').simulate('submit')

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid'
    })

  })

  test('debe de mostrar la caja de alerta con el error', () => {
    
    initialState = {
      ui: {
        msgError: 'Email no es correcto'
      }
    }
    
    store = mockStore(initialState)
    
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('.auth__alert-error').exists()).toBeTruthy()
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError)
    
  })
  
  

})
