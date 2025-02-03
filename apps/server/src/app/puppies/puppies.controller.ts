import { Controller, Get, Param, Post, Body, NotFoundException, Put, Delete, Query } from '@nestjs/common';
import { PuppiesService } from './puppies.service';

@Controller('puppies')
export class PuppiesController {
  constructor(private readonly puppiesService: PuppiesService) {}

  @Post()
  async createPuppy(@Body() puppy: any) {
    return this.puppiesService.createPuppy(puppy);
  }

  @Get()
  async getPuppies(@Query() filters: { [key: string]: string}) {
    return this.puppiesService.getPuppies(filters);
  }

  @Get(':refId')
  async getPuppy(@Param('refId') refId: string) {
    const puppy = await this.puppiesService.getPuppy(refId);
    if (!puppy) {
      throw new NotFoundException(`No puppy found with refId: ${refId}`);
    }
    return puppy;
  }

  @Put(':refId')
  async updatePuppy(@Param('refId') refId: string, @Body() updateData: any) {
    const updatedPuppy = await this.puppiesService.updatePuppy(
      refId,
      updateData
    );
    if (!updatedPuppy) {
      throw new NotFoundException(`No puppy found with refId: ${refId}`);
    }
    return updatedPuppy;
  }

  @Delete(':refId')
  async deletePuppy(@Param('refId') refId: string) {
    const deleted = await this.puppiesService.deletePuppy(refId);
    if (!deleted) {
      throw new NotFoundException(`No puppy found with refId: ${refId}`);
    }
    return { message: 'Puppy deleted successfully' };
  }
}
