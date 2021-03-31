import app from './app';
import logger from './utils/logger'

console.log(process.env)

const PORT = process.env.NODE_PORT

app.listen(PORT, () => {
    logger.info(`🚀 Aplicação iniciada na porta ${PORT} com sucesso!`)
})