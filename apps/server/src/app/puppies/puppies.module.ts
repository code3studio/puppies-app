import { Module } from '@nestjs/common';
import { PuppiesService } from './puppies.service';
import { PuppiesController } from './puppies.controller';
import { Neo4jModule } from '../neo4j/neo4j.module';

@Module({
  imports: [Neo4jModule],
  providers: [PuppiesService],
  controllers: [PuppiesController]
})
export class PuppiesModule {}
