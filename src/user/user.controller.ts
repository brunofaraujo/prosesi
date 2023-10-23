import { Body, Controller, Post, Get, Param, Put, Patch, Delete } from '@nestjs/common';

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body) {
        return {body}
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
    async updateFull(@Body() body, @Param() params) {
        return {
            method: "PUT",
            body: body,
            params: params
        }
    }

    @Patch(':id')
    async update(@Body() body, @Param() params) {
        return {
            method: "PATCH",
            body: body,
            params: params
        }
    }

    @Delete(':id')
    async delete(@Param() params) {
        return { params }
    }
}
