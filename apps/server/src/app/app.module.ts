import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Neo4jModule } from './neo4j/neo4j.module';
import { PuppiesModule } from './puppies/puppies.module';

@Module({
  imports: [Neo4jModule, PuppiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
