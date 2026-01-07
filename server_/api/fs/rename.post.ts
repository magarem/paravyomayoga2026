import { renameSync, existsSync } from 'fs'
import { resolve, dirname, join, extname } from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let { oldPath, newName } = body

  if (!oldPath || !newName) {
    throw createError({ statusCode: 400, statusMessage: 'Dados incompletos.' })
  }

  const rootDir = process.cwd()
  
  // 1. Tratamento específico para a pasta de imagens (dentro de public)
  let normalizedPath = oldPath
  
  // Remove barra inicial para facilitar a comparação
  const pathWithoutLeadingSlash = oldPath.startsWith('/') ? oldPath.substring(1) : oldPath

  if (pathWithoutLeadingSlash.startsWith('images')) {
    // Se começa com "images", sabemos que fisicamente está em "public/images"
    normalizedPath = join('public', pathWithoutLeadingSlash)
  } else {
    // Para outros arquivos (como os do Nuxt Content), usamos o caminho como ele é
    normalizedPath = pathWithoutLeadingSlash
  }

  const absoluteOldPath = resolve(rootDir, normalizedPath)
  const directory = dirname(absoluteOldPath)

  // 2. Garantir a manutenção da extensão em imagens
  const oldExt = extname(absoluteOldPath)
  const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(oldExt.toLowerCase())
  
  let finalName = newName
  if (isImage && !newName.toLowerCase().endsWith(oldExt.toLowerCase())) {
    finalName = `${newName}${oldExt}`
  }

  const absoluteNewPath = join(directory, finalName)

  // DEBUG no terminal para conferir a lógica
  console.log('--- Operação de Rename ---')
  console.log('Path original recebido:', oldPath)
  console.log('Caminho físico resolvido:', absoluteOldPath)
  console.log('Novo nome final:', finalName)

  if (!existsSync(absoluteOldPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Arquivo não encontrado: ${normalizedPath}`,
    })
  }

  if (existsSync(absoluteNewPath)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Já existe um arquivo com esse nome.',
    })
  }

  try {
    renameSync(absoluteOldPath, absoluteNewPath)
    return { success: true, name: finalName }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao renomear: ' + error.message,
    })
  }
})