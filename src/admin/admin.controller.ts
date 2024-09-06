import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Public } from 'src/auth/auth.gaurd.';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Public()
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  @Public()
  @Get()
  findAll(@Query('AdminEmailSearch') AdminEmailSearch?: string,
  @Query('phoneSearch') phoneSearch?: string,
  @Query('AdminNameSearch') AdminNameSearch?: string,)
    {
    console.log('AdminEmailSearch => ',AdminEmailSearch)
  
    return this.adminService.findAll(AdminEmailSearch,phoneSearch,AdminNameSearch);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
