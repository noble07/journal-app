import { removeError, setError, uiFinishLoading, uiStartLoading } from "../../actions/ui"
import { types } from "../../types/types"


describe('Pruebas en ui-actions', () => {
  
  test('todas las acciones deben de funcionar', () => {
    
    const err = 'Help!!!'

    const action = setError(err)

    expect(action).toEqual({
      type: types.uiSetError,
      payload: err
    })

    const removeErrorAction = removeError()
    const uiStartLoadingAction = uiStartLoading()
    const uiFinishLoadingAction = uiFinishLoading()

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    })

    expect(uiStartLoadingAction).toEqual({
      type: types.uiStartLoading
    })

    expect(uiFinishLoadingAction).toEqual({
      type: types.uiFinishLoading
    })

  })
  

})
