import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class PresenceService {
    private readonly logger = new Logger(PresenceService.name);
}