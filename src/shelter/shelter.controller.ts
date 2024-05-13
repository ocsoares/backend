import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ShelterService } from './shelter.service';
import { ServerResponse } from '../utils';
import { StaffGuard } from '@/guards/staff.guard';
import { ShelterQueryDTO } from './dtos/ShelterQuerysDTO';
import { CreateShelterDTO } from './dtos/CreateShelterDTO';
import { UpdateShelterDTO } from './dtos/UpdateShelterDTO';
import { FullUpdateShelterDTO } from './dtos/FullUpdateShelterDTO';

@ApiTags('Abrigos')
@ApiInternalServerErrorResponse()
@Controller('shelters')
export class ShelterController {
  private logger = new Logger(ShelterController.name);

  constructor(private readonly shelterService: ShelterService) {}

  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Get('')
  async index(@Query() query: ShelterQueryDTO) {
    try {
      const data = await this.shelterService.index(query);
      return new ServerResponse(200, 'Successfully get shelters', data);
    } catch (err: any) {
      this.logger.error(`Failed to get shelters: ${err}`);
      throw new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @ApiOkResponse()
  @Get(':id')
  async show(@Param('id') id: string) {
    try {
      const data = await this.shelterService.show(id);
      return new ServerResponse(200, 'Successfully get shelter', data);
    } catch (err: any) {
      this.logger.error(`Failed to get shelter: ${err}`);
      throw new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Post('')
  @UseGuards(StaffGuard)
  async store(@Body() body: CreateShelterDTO) {
    try {
      const data = await this.shelterService.store(body);
      return new ServerResponse(200, 'Successfully created shelter', data);
    } catch (err: any) {
      this.logger.error(`Failed to create shelter: ${err}`);
      throw new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateShelterDTO) {
    try {
      const data = await this.shelterService.update(id, body);
      return new ServerResponse(200, 'Successfully updated shelter', data);
    } catch (err: any) {
      this.logger.error(`Failed update shelter: ${err}`);
      throw new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiOkResponse()
  @Put(':id/admin')
  @UseGuards(StaffGuard)
  async fullUpdate(
    @Param('id') id: string,
    @Body() body: FullUpdateShelterDTO,
  ) {
    try {
      const data = await this.shelterService.fullUpdate(id, body);
      return new ServerResponse(200, 'Successfully updated shelter', data);
    } catch (err: any) {
      this.logger.error(`Failed to update shelter: ${err}`);
      throw new HttpException(err?.code ?? err?.name ?? `${err}`, 400);
    }
  }
}
