import { Controller, UseInterceptors } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  MicroserviceRequest,
  MicroserviceRequestDto,
  MicroserviceResponseFormatInterceptor,
} from '@app/sharedlib/microservice-dto';

@Controller()
@UseInterceptors(MicroserviceResponseFormatInterceptor)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @MessagePattern('tasks.create')
  async create(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const createTaskDto = await req.getAndValidateBody(CreateTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  @MessagePattern('tasks.findAll')
  findAll() {
    return this.tasksService.findAll();
  }

  @MessagePattern('tasks.findOne')
  async findOne(@MicroserviceRequest() req: MicroserviceRequestDto) {
    return this.tasksService.findOne(req.getParamInt('id'));
  }

  @MessagePattern('tasks.update')
  async update(@MicroserviceRequest() req: MicroserviceRequestDto) {
    const updateTaskDto = await req.getAndValidateBody(UpdateTaskDto);
    return this.tasksService.update(updateTaskDto.id, updateTaskDto);
  }

  @MessagePattern('tasks.remove')
  remove(@MicroserviceRequest() req: MicroserviceRequestDto) {
    return this.tasksService.remove(req.getParamInt('id'));
  }
}
