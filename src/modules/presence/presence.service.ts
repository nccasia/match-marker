import { Inject, Injectable, Logger } from "@nestjs/common";
import { CONFIG_PRESENCE } from "./constants";
import { Presence } from "./interface/presence";

@Injectable()
export class PresenceService {
    private readonly logger = new Logger(PresenceService.name);
    private readonly presence: Presence;

    constructor(@Inject(CONFIG_PRESENCE) _presence: Presence) {
      this.presence = _presence;
    }

    getPresence() : Presence {
      return this.presence;
    }
}