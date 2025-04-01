import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto, CreateConsultationsDto, UpdateConsultationsDto, UpdatedConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Public } from 'src/auth/auth.gaurd.';
import { Consultation } from './entities/consultation.entity';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}
  @Public()
  @Post()
  create(@Body() createConsultationsDto: CreateConsultationsDto) {
    return this.consultationService.create(createConsultationsDto);
  }
  @Public()
  @Get()
  findAll(@Query('ConsultationSessionSearch') ConsultationSessionSearch?: string,
  @Query('ConsultationDaySearch') ConsultationDaySearch?: string,
  @Query('ConsultationDateSearch') ConsultationDateSearch?: string)
    {
    console.log('ConsultationSessionSearch => ',ConsultationSessionSearch)
  
    return this.consultationService.findAll(ConsultationSessionSearch,ConsultationDaySearch,ConsultationDateSearch);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.consultationService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsultationDto: UpdateConsultationsDto) {
    return this.consultationService.update(+id, updateConsultationDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(+id);
  }
  @Get(':doc_id/:day/:session')
  async getConsultations(
    @Param('doc_id') doc_id: number,
    @Param('day') day: string,
    @Param('session') session: string,
  ): Promise<Consultation[]> {
    return this.consultationService.findConsultations(doc_id, day, session);
  }
  @Public()
  @Get('doctor/:doc_id')
  findByDoctor(@Param('doc_id') doctorId: string) {
    return this.consultationService.findByDoctor(+doctorId);
  }
@Public()
@Patch('doctor/:doc_id')
updateConsultation(@Param('doc_id') doc_id: string, @Body() updateConsultationDto: UpdateConsultationDto) {
  return this.consultationService.updateConsultationn(+doc_id, updateConsultationDto);
}
// @Public()
// @Patch('batch-update')
// async batchUpdate(@Body() updateConsultationDtos: UpdatedConsultationDto[]): Promise<Consultation[]> {
//   return this.consultationService.batchUpdate(updateConsultationDtos);
// }
}
