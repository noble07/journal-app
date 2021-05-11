import { mount } from "enzyme"
import { JournalEntry } from "../../../components/journal/JournalEntry"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { activeNote } from "../../../actions/notes"

const middlewares = [thunk]

const mockStore = configureStore(middlewares)

const initialState = {}

const store = mockStore(initialState)
store.dispatch = jest.fn()

const note = {
  id: 10,
  date: 0,
  title: 'Hola',
  body: 'Mundo',
  url: 'https://algunsitio.com/foto.jpg'
}

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...note}/>
  </Provider>
)

describe('Pruebas en <JournalEntry />', () => {
  
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe de activar la nota', () => {
    
    wrapper.find('.journal__entry').simulate('click')

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, {...note})
    )

  })
  

})
