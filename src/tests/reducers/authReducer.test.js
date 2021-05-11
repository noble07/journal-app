import { authReducer } from "../../reducers/authReducer"

const demoAuth = {
  uid: 'kdajsjdl1j3212131',
  name: 'Juan'
}

describe('Pruebas en authReducer', () => {
  
  test('debe de retornar el estado por defecto', () => {
    
    const auth = authReducer(demoAuth, {})

    expect(auth).toEqual(demoAuth)

  })

  test('debe de hacer el login del usuario', () => {


    const action = {
      type: '[Auth] Login',
      payload: {
        uid: 'klsdfjlas1231231',
        displayName: 'Juan'
      }
    }

    const auth = authReducer({}, action)
    
    expect(auth).toEqual({
      uid: 'klsdfjlas1231231',
      name: 'Juan'
    })

  })

  test('debe de hacer el logout del usuario', () => {

    const action = {
      type: '[Auth] Logout'
    }
    
    const auth = authReducer(demoAuth, action)

    expect(auth).toEqual({})

  })
  
  

})
