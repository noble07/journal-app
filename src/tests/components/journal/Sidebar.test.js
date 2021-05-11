import { mount } from "enzyme"
import { Sidebar } from "../../../components/journal/Sidebar"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { startLogout } from "../../../actions/auth"
import { startNewNote } from "../../../actions/notes"


jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),

}))
jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn(),

}))

const middlewares = [thunk]

const mockStore = configureStore(middlewares)

const initialState = {
  auth: {
    name: 'Juan'
  },
  notes: {
    notes: []
  }
}

const store = mockStore(initialState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider>
)

describe('Pruebas en <Sidebar />', () => {
  
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe de llamar el startLogout', () => {
    wrapper.find('button').simulate('click')

    expect(startLogout).toHaveBeenCalled()
  })

  test('debe de llamar el startNewNote', () => {
    wrapper.find('.journal__new-entry').simulate('click')

    expect(startNewNote).toHaveBeenCalled()
  })

})
