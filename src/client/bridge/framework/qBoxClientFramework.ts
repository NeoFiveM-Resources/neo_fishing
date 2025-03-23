import {QbCoreClientFramework} from "./qbCoreClientFramework";
import {ClientInventory} from "../inventory/clientInventory";
import {ClientFramework} from "./clientFramework";
import {cache} from "@overextended/ox_lib/client";

export class QBoxClientFramework extends QbCoreClientFramework {
    constructor(readonly inventory: ClientInventory) {
        super('qbx', inventory);
    }

    initializeEvents(): ClientFramework {
        super.initializeEvents();
        
        this.QBCORE = exports['qb-core'].GetCoreObject();

        AddEventHandler('QBCore:Client:OnPlayerLoaded', () => {
            this.playerData = this.getPlayerData();
            this.playerLoaded = true;
            TriggerEvent(`${cache.resource}:onPlayerLoaded`);
        });

        on('qbx_core:client:playerLoggedOut', () => {
            this.playerData = undefined;
            this.playerLoaded = false;
        })

        return this;
    }

    getPlayerData(): any {
        return exports.qbx_core.GetPlayerData();
    }
}
