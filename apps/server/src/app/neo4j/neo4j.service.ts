import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit, OnModuleDestroy {
  private driver: Driver;
  private readonly URI = 'neo4j+s://d097a0d4.databases.neo4j.io';
  private readonly USERNAME = 'neo4j';
  private readonly PASSWORD = '8POzektmTmgYipnrYBhY32MvSTNaUWf0J_4Jmx9-KQo';

  async onModuleInit() {
    try {
        this.driver = neo4j.driver(
          this.URI,
          neo4j.auth.basic(this.USERNAME, this.PASSWORD)
        );
    
        await this.driver.verifyConnectivity();
        console.log('Successfully connected to Neo4j database!');
    } catch (error) {
        console.error('Error connecting to Neo4j database:', error);
    }
  } 

  async runQuery(query: string, params: any = {}) {
    const session = this.driver.session();
    try {
      return await session.run(query, params);
    } catch (error) {
      console.error('Error running query:', error);
    } finally {
      await session.close();
    }
  }

  onModuleDestroy() {
    console.log('Closing Neo4j database connection...');
    return this.driver.close();
  }
}
