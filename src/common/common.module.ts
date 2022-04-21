import { Module } from '@nestjs/common'
import { CommonService } from './common.service';

@Module({
    exports: [CommonService]
})
export class CommonModule {}
