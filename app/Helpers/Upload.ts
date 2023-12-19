// import { Application } from '@adonisjs/core/build/standalone'
import Application from '@ioc:Adonis/Core/Application'

async function uploadFile(file) {
  try {
    const timestamp = new Date().valueOf()

    if (file) {
      const fileName = `${timestamp}_${file.clientName}`
      await file.move(Application.tmpPath('uploads'), {
        name: fileName,
        overwrite: true,
      })

      const finalUrl = 'uploads/' + fileName

      return finalUrl
    }
  } catch (error) {
    console.error('Upload file error: ', error.message)
    throw new Error(error)
  }
}

export default uploadFile
