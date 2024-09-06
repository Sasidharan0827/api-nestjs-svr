import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { CreateAppoinmentDto } from './dto/create-appoinment.dto';

import { Public } from 'src/auth/auth.gaurd.';
import { UpdateAppoinmentDto } from './dto/update-appoinment.dto';

@Controller('appoinment')
export class AppoinmentController {
  constructor(private readonly appoinmentService: AppoinmentService) {}
  @Public()
  @Post()
  create(@Body() createAppoinmentDto: CreateAppoinmentDto) {
    return this.appoinmentService.create(createAppoinmentDto);
  }
  @Public()
  @Get()
  findAll(@Query('AppointmentDoctorSearch') AppointmentDoctorSearch?: string,
  @Query('AppointmentNameSearch') AppointmentNameSearch?: string,
  @Query('AppointmentDateSearch') AppointmentDateSearch?: string)
    {
      console.log('AppointmentDoctorSearch =>', AppointmentDoctorSearch);
      console.log('AppointmentNameSearch =>', AppointmentNameSearch);
      console.log('AppointmentDateSearch =>', AppointmentDateSearch);
  
    return this.appoinmentService.findAll(AppointmentDoctorSearch,AppointmentNameSearch,AppointmentDateSearch);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appoinmentService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppoinmentDto: UpdateAppoinmentDto) {
    return this.appoinmentService.update(+id,updateAppoinmentDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appoinmentService.remove(+id);
  }
}
