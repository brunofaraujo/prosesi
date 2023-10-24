import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patchh-user.dto";

@Injectable()
export class UserService {

    constructor (private readonly prisma: PrismaService) {}

    async create({name, email, password}: CreateUserDTO) {

        return await this.prisma.user.create({
            data: {
                name, email, password
            }
        });
    }

    async getUsers() {
        return await this.prisma.user.findMany() 
    }

    async getUser(id: number) {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    // need to disable DTO in order to replace all at once as PUT
    async updateFull(id: number, data: UpdatePutUserDTO) {
        return await this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async update(id: number, data: UpdatePatchUserDTO) {
        return await this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

}