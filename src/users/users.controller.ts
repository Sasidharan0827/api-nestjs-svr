import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards,   Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, Public } from 'src/auth/auth.gaurd.';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  
  @Public()
  @Get()
  findAll(@Query('UserEmailSearch') UserEmailSearch?: string,
  @Query('UsearchPhoneSearch') UsearchPhoneSearch?: string,
  @Query('UserNameSearch') UserNameSearch?: string)
    {
    console.log('UserEmailSearch => ',UserEmailSearch)
  
    return this.usersService.findAll(UserEmailSearch,UserNameSearch,UsearchPhoneSearch);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
