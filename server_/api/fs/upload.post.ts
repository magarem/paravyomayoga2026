import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'

export default defineEventHandler(async (event) => {
  // 1. Lemos os dados multipart (arquivos + campos de texto)
  const formData = await readMultipartFormData(event)
  
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Nenhum dado enviado.',
    })
  }

  let basePath = ''
  let currentPath = ''
  const files: any[] = []

  // 2. Extraímos os campos do FormData
  // No multipart, cada item vem em um array. Percorremos para identificar o que é o quê.
  for (const item of formData) {
    if (item.name === 'basePath') {
      basePath = item.data.toString()
    } else if (item.name === 'currentPath') {
      currentPath = item.data.toString()
    } else if (item.name === 'files' && item.filename) {
      files.push(item)
    }
  }

  // 3. Resolvemos o caminho físico no disco
  const rootDir = process.cwd()
  const targetDir = resolve(rootDir, basePath, currentPath)

  try {
    // 4. Garantimos que a pasta de destino existe (se não, criamos)
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true })
    }

    // 5. Gravamos cada arquivo no disco
    for (const file of files) {
      const filePath = join(targetDir, file.filename)
      
      // file.data é um Buffer contendo o conteúdo binário do arquivo
      writeFileSync(filePath, file.data)
    }

    return {
      success: true,
      count: files.length,
      path: targetDir
    }

  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao salvar arquivos: ' + error.message,
    })
  }
})