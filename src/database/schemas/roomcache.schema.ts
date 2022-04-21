import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

export type RoomCacheDocument = RoomCache & Document;

@Schema({ timestamps: true })
export class RoomCache {
    @Prop()
    clients: number;
    @Prop()
    locked: boolean;
    @Prop()
    private: boolean;
    @Prop()
    maxClients: number;
    @Prop([MongoSchema.Types.Mixed])
    metadata: Object
    @Prop()
    name: string;
    @Prop()
    processId: string;
    @Prop()
    roomId: string;
    @Prop()
    unlisted: boolean;
}

export const RoomCacheSchema = SchemaFactory.createForClass(RoomCache);