import { rmSync, existsSync } from 'fs'
import { resolve, join } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { path, isDirectory } = body

  if (!path) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Caminho não fornecido',
    })
  }

  // Resolvemos o caminho absoluto a partir da raiz do projeto
  // Importante: o path que vem do frontend já deve ser algo como "content/arquivo.md" 
  // ou "public/images/foto.jpg" (ou ajustado conforme sua lógica de 'basePath')
  const rootDir = process.cwd()
  
  // Se o caminho começar com /images (o que acontece no nosso list ajustado),
  // precisamos de apontar para public/images
  let normalizedPath = path
  if (path.startsWith('/images')) {
    normalizedPath = join('public', path)
  }

  const absolutePath = resolve(rootDir, normalizedPath)

  try {
    if (existsSync(absolutePath)) {
      // rmSync com recursive e force remove ficheiros ou pastas (mesmo com conteúdo)
      rmSync(absolutePath, { 
        recursive: true, 
        force: true 
      })
      
      return { 
        success: true, 
        message: isDirectory ? 'Diretório removido' : 'Ficheiro removido' 
      }
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Ficheiro ou diretório não encontrado no disco',
      })
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao eliminar: ' + error.message,
    })
  }
})