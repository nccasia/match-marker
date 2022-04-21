export interface RoomAvailable<Metadata = any> {
    roomId: string;
    clients: number;
    maxClients: number;
    metadata?: Metadata;
}