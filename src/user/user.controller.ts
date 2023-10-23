import { Body, Controller, Post, Get, Param, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patchh-user.dto';

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() {email, name, password, passwordConfirmation}: CreateUserDTO) {
        return {email, name, password, passwordConfirmation}
    }

    @Get()
    async getUsers() {
        return {users: []} 
    }

    @Get(':id')
    async getUser(@Param() params) {
        return {user: {}, params}
    }

    @Put(':id')
    async updateFull(@Body() {email, name, password, passwordConfirmation}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: "PUT",
            email, name, password, passwordConfirmation,
            id
        }
    }

    @Patch(':id')
    async update(@Body() {email, name, password, passwordConfirmation}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
        return {
            method: "PATCH",
            email, name, password, passwordConfirmation,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return { id }
    }
}
