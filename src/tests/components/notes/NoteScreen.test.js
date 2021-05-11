import { mount } from "enzyme"
import { NoteScreen } from "../../../components/notes/NoteScreen"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { activeNote } from "../../../actions/notes"

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}))

const middlewares = [thunk]

const mockStore = configureStore(middlewares)

const initialState = {
  notes: {
    active: {
      id: 'ABC123',
      title: 'Titulo',
      body: 'body',
      date: 123142345245
    }
  }
}

const store = mockStore(initialState)
store.dispatch = jest.fn

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
)

describe('Pruebas en <NoteScreen />', () => {
  
  test('debe de mostrarse correctamente', () => {
    
    expect(wrapper).toMatchSnapshot()

  })

  test('debe de disparar el active note', () => {
    
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola otra ves'
      }
    })

    expect(activeNote).toHaveBeenCalled()
    expect(activeNote).toHaveBeenLastCalledWith(
      'ABC123',
      {
        body: 'body',
        title: 'Hola otra ves',
        id: 'ABC123',
        date: 123142345245
      }
    )
    
  })
  

})
