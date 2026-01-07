import { readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

export default defineEventHandler(async (event) => {
  const { base, sub } = getQuery(event)
  const rootDir = process.cwd()
  
  // Caminho físico completo para o Node.js ler o disco
  const targetDir = join(rootDir, String(base), String(sub || ''))

  try {
    const items = readdirSync(targetDir)
    return items.map(name => {
      const fullPath = join(targetDir, name)
      const stats = statSync(fullPath)
      
      // Geramos o path relativo (ex: public/images/foto.jpg)
      let relativePath = join(String(base), String(sub || ''), name).replace(/\\/g, '/')

      // SE o arquivo estiver dentro de 'public', removemos o 'public/' do path
      // para que o frontend consiga usar como URL direta (ex: /images/foto.jpg)
      if (relativePath.startsWith('public/')) {
        relativePath = relativePath.replace('public/', '/')
      }

      return {
        name,
        isDirectory: stats.isDirectory(),
        path: relativePath,
        size: stats.size,
        updatedAt: stats.mtime
      }
    }).sort((a, b) => Number(b.isDirectory) - Number(a.isDirectory))
  } catch (e) {
    return []
  }
})