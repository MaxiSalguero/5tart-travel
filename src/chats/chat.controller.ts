import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Res } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';

@ApiTags("Chat")
@Controller('chat')
export class ChatController {
    
    @Get()
    serverStaticFiles(@Res() res: Response){
        const filePath = join(__dirname,'public', 'index.html');
        res.sendFile(filePath);
    }
}
