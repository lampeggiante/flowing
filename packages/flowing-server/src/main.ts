import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  const port = process.env.PORT ?? 3000
  await app.listen(port)
  console.log(`Server is running on port ${port}`)
  console.log(`http://localhost:${port}`)
}
bootstrap()
