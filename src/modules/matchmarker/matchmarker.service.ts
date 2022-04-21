import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from "../../common/common.service";
import { RoomCache, RoomCacheDocument } from "../../database/schemas/roomcache.schema";
import { JoinOptions, SeatReservation, SeatReservationError } from "./matchmarker.dto";

@Injectable()
export class MatchMarkerService {
    private readonly logger = new Logger(MatchMarkerService.name);

    constructor(
        @InjectModel(RoomCache.name) 
        private readonly roomCacheModel: Model<RoomCacheDocument>,
        private readonly commService: CommonService,
      ) {}

      async getAvailableRooms(roomName: string) : Promise<RoomCache[]> {
        /**
        * list public & unlocked rooms
        */
        const conditions: any = {
            locked: false,
            private: false,
        };
        if (roomName) {
            conditions["name"] = roomName;
        }
        return this.roomCacheModel.find(conditions);
    }

    async joinOrCreate(roomName: string, clientOptions: JoinOptions = {}) {
        return await this.commService.retry<Promise<SeatReservation>>(async () => {
          let room = await this.findOneRoomAvailable(roomName, clientOptions);
      
          if (!room) {
            room = await this.createRoom(roomName, clientOptions);
          }
      
          return await this.reserveSeatFor(room, clientOptions);
        }, 5, [SeatReservationError]);
    }
    
}