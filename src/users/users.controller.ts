import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards,   Request
} from '@nestjs/common';
import { UsersService } from './users.service';
<<<<<<< HEAD
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, Public } from 'src/auth/auth.gaurd.';

=======
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
>>>>>>> 29c5f3bd09b6c52f26e131f40f765c956beade2b

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
