import { Body, Controller, Post, Get, Param, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patchh-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor (private readonly userService: UserService) {}

    @Post()
    async create(@Body() {email, name, password}: CreateUserDTO) {
        return await this.userService.create({email, name, password})
    }

    @Get()
    async getUsers() {
        return this.userService.getUsers()
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUser(id)
    }

    @Put(':id')
    async updateFull(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return await this.userService.updateFull(id, data)
    }

    @Patch(':id')
    async update(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return await this.userService.update(id, data)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id)
    }

}
