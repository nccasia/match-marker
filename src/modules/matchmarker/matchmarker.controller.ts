import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { JoinOptions, RoomAvailable } from "./matchmarker.dto";
import { MatchMarkerService } from "./matchmarker.service";


@Controller("matchmake")
export class MatchMarkerController {

    constructor(private readonly matchMarkerService: MatchMarkerService) {}

    @Get(':room_name')
    async getAvailableRooms(@Param() params: any): Promise<RoomAvailable[]> {
        const { room_name } = params;
        const roomCaches = await this.matchMarkerService.getAvailableRooms(room_name);
        const rooms = roomCaches.map(s => ({ roomId: s.roomId, clients: s.clients, maxClients: s.maxClients, metadata: s.metadata } as RoomAvailable));
        return rooms;
    }

    @Post('joinOrCreate/:methodName/:roomName')
    async joinOrCreate(@Param() params: any, @Body() body: JoinOptions): Promise<any> {
        const { methodName, roomName } = params;

        
    }
}