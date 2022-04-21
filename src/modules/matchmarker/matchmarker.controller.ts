import { Controller, Get, Param } from "@nestjs/common";
import { RoomAvailable } from "./matchmarker.dto";
import { MatchMarkerService } from "./matchmarker.service";


@Controller("matchmake")
export class MatchMarkerController {

    constructor(private readonly matchMarkerService: MatchMarkerService) {}

    @Get(':room_name')
    async getAvailableRooms(@Param() params: any): Promise<RoomAvailable[]> {
        const { room_name } = params;
        const roomCaches = await this.matchMarkerService.getAvailableRooms(room_name);
        const rooms = roomCaches.map(s => ({ roomId: s.roomId, clients: s.clients, maxClients: s.maxClients, metadata: s.metadata } as RoomAvailable));
        return rooms
    }
}