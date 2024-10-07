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
import { Wallet } from '@/database/entities/wallet.entity';
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@JsonApi(Wallet)
export class WalletController extends JsonBaseController<Wallet> {
  @InjectService() public service: JsonApiService<Wallet>;

  @Get(':id')
  getOne(id: string, query: QueryType<Wallet>): Promise<ResourceObject<Wallet>> {
    return super.getOne(id, query);
  }

  @Get()
  getAll(@Query() query: QueryType<Wallet>): Promise<ResourceObject<Wallet, 'array'>> {
    return super.getAll(query);
  }

  @Delete(':id')
  deleteOne(@Param() id: string): Promise<void> {
    return super.deleteOne(id);
  }

  @Patch(':id')
  patchOne(@Param() id: string, inputData: PatchData<Wallet>): Promise<ResourceObject<Wallet>> {
    return super.patchOne(id, inputData);
  }

  @Post()
  postOne(inputData: PostData<Wallet>): Promise<ResourceObject<Wallet>> {
    return super.postOne(inputData);
  }

  @Get(':id/relationships/:relName')
  getRelationship<Rel extends EntityRelation<Wallet>>(
    @Param() id: string,
    relName: Rel,
  ): Promise<ResourceObjectRelationships<Wallet, Rel>> {
    return super.getRelationship(id, relName);
  }

  @Post(':id/relationships/:relName')
  postRelationship<Rel extends EntityRelation<Wallet>>(
    @Param() id: string,
    relName: Rel,
    input: PostRelationshipData,
  ): Promise<ResourceObjectRelationships<Wallet, Rel>> {
    return super.postRelationship(id, relName, input);
  }

  @Delete(':id/relationships/:relName')
  deleteRelationship<Rel extends EntityRelation<Wallet>>(
    @Param() id: string,
    relName: Rel,
    input: PostRelationshipData,
  ): Promise<void> {
    return super.deleteRelationship(id, relName, input);
  }

  @Patch(':id/relationships/:relName')
  patchRelationship<Rel extends EntityRelation<Wallet>>(
    @Param() id: string,
    relName: Rel,
    input: PatchRelationshipData,
  ): Promise<ResourceObjectRelationships<Wallet, Rel>> {
    return super.patchRelationship(id, relName, input);
  }
}
