export interface RoomAvailable<Metadata = any> {
    roomId: string;
    clients: number;
    maxClients: number;
    metadata?: Metadata;
}

export type JoinOptions = any;

export interface RoomListingData {
    clients: number;
    locked: boolean;
    private: boolean;
    maxClients: number;
    metadata: any;
    name: string;
    processId: string;
    roomId: string;
    unlisted: boolean;
    [property: string]: any;
  }

export interface SeatReservation {
    sessionId: string;
    room: RoomListingData;
}

export class SeatReservationError extends Error {
    constructor(message: string) {
      super(message);
    }
  }