import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/user.schema';

@Controller('api/promo-codes')
export class PromoCodesController {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createPromoCodeDto: CreatePromoCodeDto) {
    return this.promoCodesService.create(createPromoCodeDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.promoCodesService.findAll();
  }

  @Get('active')
  findActive() {
    return this.promoCodesService.findActive();
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate/:code')
  validatePromoCode(
    @Param('code') code: string,
    @Query('orderAmount') orderAmount: string,
    @Query('merchantId') merchantId?: string,
  ) {
    return this.promoCodesService.validatePromoCode(code, parseFloat(orderAmount), merchantId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoCodesService.remove(id);
  }
}
