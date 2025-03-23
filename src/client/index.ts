import Config from '@common/config';
import {cache} from '@overextended/ox_lib/client';
import {ClientInventory} from "./bridge/inventory/clientInventory";
import {ClientFramework} from "./bridge/framework/clientFramework";
import {NotifyBase} from "./bridge/notify/notifyBase";
import {TargetBase} from "./bridge/target/targetBase";
import {
    initializeClientFramework,
    initializeClientInventory,
    initializeNotify,
    initializeTarget
} from "./bridge/initialization";
import {Greetings} from "../common";
import {FishingManager} from "./fishingManager";

//##[DO NOT REMOVE]################
const clientInventory: ClientInventory = initializeClientInventory();
export const clientFramework: ClientFramework = initializeClientFramework(clientInventory).initializeEvents();
export const target: TargetBase = initializeTarget();
export const notify: NotifyBase = initializeNotify();
//#################################

Greetings();

if (Config.EnableNuiCommand) {
    onNet(`${cache.resource}:openNui`, () => {
        SetNuiFocus(true, true);

        SendNUIMessage({
            action: 'setVisible',
            data: {
                visible: true,
            },
        });
    });

    RegisterNuiCallback('exit', (data: null, cb: (data: unknown) => void) => {
        SetNuiFocus(false, false);
        cb({});
    });
}

const fishingManager = new FishingManager();









