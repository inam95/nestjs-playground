import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { envSchema } from './env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const data = envSchema.safeParse(env);

        if (!data.success) {
          console.error('❌ Invalid env:');
          console.error(
            JSON.stringify(data.error.flatten().fieldErrors, null, 2),
          );
          process.exit(1);
        }

        return data.data;
      },
      envFilePath: ['.env'],
      cache: true,
      // eslint-disable-next-line no-process-env
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
