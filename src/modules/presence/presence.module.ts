import { DynamicModule, Module } from "@nestjs/common";
import { CONFIG_PRESENCE } from "./constants";
import { Presence } from "./interface/presence";
import { PresenceService } from "./presence.service";

@Module({})
export class PresenceModule {
    static forRoot(presence: Presence): DynamicModule {
        return {
            module: PresenceModule,
            providers: [
              {
                provide: CONFIG_PRESENCE,
                useValue: presence,
              },
              PresenceService,
            ],
            exports: [PresenceService],
          };
    }
}