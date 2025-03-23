import {ClientFramework} from "./clientFramework";
import {cache} from "@overextended/ox_lib/client";

export class OxCoreClientFramework extends ClientFramework {
    OX: any;

    initializeEvents(): ClientFramework {
        super.initializeEvents();

        this.OX = exports['ox_core']

        AddEventHandler('ox:playerLoaded', () => {
            this.playerData = this.getPlayerData;
            this.playerLoaded = true;
            TriggerEvent(`${cache.resource}:onPlayerLoaded`);
        });

        AddEventHandler('ox:playerLogout', (data: any) => {
            this.playerData = undefined;
            this.playerLoaded = false;
        });

        return this;
    }

    getPlayerData(): unknown {
        return this.OX.GetPlayer();
    }

    getPlayerInventory(): unknown {
        if (this.inventory) {
            return super.getPlayerInventory();
        } else {
            console.error('OX Framework detected, but you are not using ox_inventory!');
        }
    }

}
