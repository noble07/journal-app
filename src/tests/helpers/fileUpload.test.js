import cloudinary from 'cloudinary'

import { fileUpload } from '../../helpers/fileUpload'

cloudinary.config({ 
  cloud_name: 'dx0cugakd', 
  api_key: '992823174375414', 
  api_secret: 'Jnvzn7wYviFYm3H1fIqWiQp3Cig' 
});

describe('Pruebas en fileUpload', () => {
  
  test('debe de cargar un archivo y retornar el URL', async() => {
    
    const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
    const blob = await resp.blob()


    const file = new File([blob], 'foto.png')
    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    // Borrar imagen por id
    const segments = url.split('/')
    const imageId = segments[ segments.length - 1 ].replace('.png', '')


    const {deleted} = await cloudinary.v2.api.delete_resources(imageId)
    expect(deleted).toEqual({ [imageId]: 'deleted' })

  })

  test('debe de retornar un error', async() => {
    
    const file = new File([], 'foto.png')
    const url = await fileUpload(file)

    expect(url).toBeNull()

  })
  
})
