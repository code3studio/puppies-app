import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Neo4jService } from '../neo4j/neo4j.service';
@Injectable()
export class PuppiesService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async createPuppy(puppy: any) {
    const getMaxIdQuery =
      'MATCH (p:Puppy) RETURN MAX(toInteger(p.refId)) AS maxId';

    try {
      const maxIdResult = await this.neo4jService.runQuery(getMaxIdQuery);
      let newRefId = 1;

      const maxIdRecord = maxIdResult.records[0]?.get('maxId');
      if (maxIdRecord !== null && maxIdRecord !== undefined) {
        newRefId = maxIdRecord.toNumber() + 1;
      }

      puppy.refId = newRefId.toString();

      const createQuery = `
            CREATE (p:Puppy {
                name: $name, breed: $breed, color: $color,
                location: $location, gender: $gender, dob: $dob,
                refId: $refId, image: $image, contact: $contact
            }) RETURN p
        `;

      const result = await this.neo4jService.runQuery(createQuery, puppy);
      console.log('Create result:', result.records);
      return result.records.map((record) => record.get('p').properties);
    } catch (error) {
      console.error('Error creating puppy:', error);
      throw error;
    }
  }

  async getPuppies(filters?: { [key: string]: string }): Promise<any[]> {
    let query = 'MATCH (p:Puppy)';
    const queryParams: any = {};

    const conditions: string[] = [];

    if (filters) {
      if (filters.petType) {
        conditions.push('p.petType = $petType');
        queryParams.petType = filters.petType;
      }
      if (filters.status) {
        conditions.push('p.status = $status');
        queryParams.status = filters.status;
      }
      if (filters.location) {
        conditions.push('p.location = $location');
        queryParams.location = filters.location;
      }
      if (filters.breed) {
        conditions.push('p.breed = $breed');
        queryParams.breed = filters.breed;
      }
      if (filters.gender) {
        conditions.push('p.gender = $gender');
        queryParams.gender = filters.gender;
      }
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ' RETURN p';

    try {
      const result = await this.neo4jService.runQuery(query, queryParams);
      return result.records.map((record) => record.get('p').properties);
    } catch (error) {
      console.error('Error filtering puppies:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve filtered puppies.'
      );
    }
  }

  async getPuppy(refId: string) {
    const query = 'MATCH (p:Puppy {refId: $refId}) RETURN p';

    try {
      const result = await this.neo4jService.runQuery(query, { refId });
      if (result.records.length === 0) {
        console.warn(`No puppy found with refId: ${refId}`);
        return null;
      }
      const puppy = result.records[0].get('p').properties;
      console.log('Get result:', result.records);
      return puppy;
    } catch (error) {
      console.error('Error getting puppy:', error);
      throw error;
    }
  }

  async updatePuppy(refId: string, updateData: any) {
    const query = `
        MATCH (p:Puppy {refId: $refId})
        SET p += $updateData
        RETURN p
    `;

    try {
      const result = await this.neo4jService.runQuery(query, {
        refId,
        updateData,
      });
      if (result.records.length === 0) return null;
      return result.records[0].get('p').properties;
    } catch (error) {
      console.error('Error updating puppy:', error);
      throw error;
    }
  }

  async deletePuppy(refId: string) {
    const query = `
        MATCH (p:Puppy {refId: $refId})
        DELETE p
        RETURN COUNT(p) AS deletedCount
    `;

    try {
      const result = await this.neo4jService.runQuery(query, { refId });
      return result.records[0].get('deletedCount').toNumber() > 0;
    } catch (error) {
      console.error('Error deleting puppy:', error);
      throw error;
    }
  }
}
