import { Module } from "@nestjs/common";
import { MatchMarkerController } from "./matchmarker.controller";
import { MatchMarkerService } from "./matchmarker.service";
import { MongooseModule } from '@nestjs/mongoose';
import { RoomCache, RoomCacheSchema } from "../../database/schemas/roomcache.schema";

@Module({
    imports:  [MongooseModule.forFeature([{ name: RoomCache.name, schema: RoomCacheSchema }])],
    providers: [MatchMarkerService],
    controllers: [MatchMarkerController],
    exports: []
})
export class MatchMarkerModule {}