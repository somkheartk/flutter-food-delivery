import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';

@Controller('api/merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MERCHANT, UserRole.ADMIN)
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantsService.create(createMerchantDto);
  }

  @Get()
  findAll(@Query('isActive') isActive?: string) {
    const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
    return this.merchantsService.findAll(active);
  }

  @Get('nearby')
  findNearby(
    @Query('longitude') longitude: string,
    @Query('latitude') latitude: string,
    @Query('maxDistance') maxDistance?: string,
  ) {
    return this.merchantsService.findNearby(
      parseFloat(longitude),
      parseFloat(latitude),
      maxDistance ? parseInt(maxDistance) : undefined,
    );
  }

  @Get('owner/:ownerId')
  findByOwner(@Param('ownerId') ownerId: string) {
    return this.merchantsService.findByOwner(ownerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MERCHANT, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMerchantDto: UpdateMerchantDto) {
    return this.merchantsService.update(id, updateMerchantDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MERCHANT, UserRole.ADMIN)
  @Patch(':id/open-status')
  updateOpenStatus(@Param('id') id: string, @Body('isOpen') isOpen: boolean) {
    return this.merchantsService.updateOpenStatus(id, isOpen);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantsService.remove(id);
  }
}
