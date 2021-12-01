import fs from 'fs'

export const readInput = (inputPath) => {
  return new Promise((resolve, reject) =>
    fs.readFile(inputPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
        reject(err)
      }
      resolve(data)
    })
  )
}
