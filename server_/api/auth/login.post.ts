import { setCookie, readBody, createError } from 'h3'
import { SignJWT } from 'jose'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 1. Validação das credenciais (Aqui você pode usar o seu SQLite no futuro)
  // No momento estamos usando o 'adm' e '123' como você definiu
  if (body.username !== 'adm' || body.password !== '123') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciais inválidas'
    })
  }


  const config = useRuntimeConfig()
  const secret = new TextEncoder().encode(config.jwtSecret)
  // 2. Preparar a chave secreta
  // Use a mesma chave que definiu no .env ou uma string fixa para teste
  // const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'sua-chave-secreta-de-pelo-menos-32-caracteres')

  // 3. Criar o Token JWT
  const token = await new SignJWT({ 
    username: body.username,
    role: 'admin' 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // O token expira em 1 dia
    .sign(secret)

  // 4. Registrar o Cookie com o Token real
  setCookie(event, 'auth_token', token, {
    httpOnly: true,    // Impede acesso via JavaScript (XSS)
    secure: process.env.NODE_ENV === 'production', // Apenas HTTPS em produção
    sameSite: 'lax',   // Necessário para o redirecionamento funcionar
    path: '/',         // Disponível em toda a aplicação
    maxAge: 60 * 60 * 24 // 1 dia em segundos
  })

  return {
    success: true
  }
})