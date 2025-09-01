import { ClassSerializerInterceptor, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import {
  JsonApi,
  JsonBaseController,
  InjectService,
  JsonApiService,
  Query as QueryType,
  ResourceObject,
  EntityRelation,
  PatchRelationshipData,
  ResourceObjectRelationships,
  PostData,
  PatchData,
  PostRelationshipData,
} from 'json-api-nestjs';
import { User } from '@/database/entities/user.entity';
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@JsonApi(User)
export class UserController extends JsonBaseController<User> {
  @InjectService() public service: JsonApiService<User>;

  @Get(':id')
  getOne(id: string, query: QueryType<User>): Promise<ResourceObject<User>> {
    return super.getOne(id, query);
  }

  @Get()
  getAll(@Query() query: QueryType<User>): Promise<ResourceObject<User, 'array'>> {
    return super.getAll(query);
  }

  @Delete(':id')
  deleteOne(@Param() id: string): Promise<void> {
    return super.deleteOne(id);
  }

  @Patch(':id')
  patchOne(@Param() id: string, inputData: PatchData<User>): Promise<ResourceObject<User>> {
    return super.patchOne(id, inputData);
  }

  @Post()
  postOne(inputData: PostData<User>): Promise<ResourceObject<User>> {
    return super.postOne(inputData);
  }

  @Get(':id/relationships/:relName')
  getRelationship<Rel extends EntityRelation<User>>(
    @Param() id: string,
    relName: Rel,
  ): Promise<ResourceObjectRelationships<User, Rel>> {
    return super.getRelationship(id, relName);
  }

  @Post(':id/relationships/:relName')
  postRelationship<Rel extends EntityRelation<User>>(
    @Param() id: string,
    relName: Rel,
    input: PostRelationshipData,
  ): Promise<ResourceObjectRelationships<User, Rel>> {
    return super.postRelationship(id, relName, input);
  }

  @Delete(':id/relationships/:relName')
  deleteRelationship<Rel extends EntityRelation<User>>(
    @Param() id: string,
    relName: Rel,
    input: PostRelationshipData,
  ): Promise<void> {
    return super.deleteRelationship(id, relName, input);
  }

  @Patch(':id/relationships/:relName')
  patchRelationship<Rel extends EntityRelation<User>>(
    @Param() id: string,
    relName: Rel,
    input: PatchRelationshipData,
  ): Promise<ResourceObjectRelationships<User, Rel>> {
    return super.patchRelationship(id, relName, input);
  }
}
