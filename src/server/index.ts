import Config from '@common/config';
import {addCommand, cache} from '@overextended/ox_lib/server';
import {initializeServerFramework, initializeServerInventory} from "./bridge/initialization";
import {ServerInventory} from "./bridge/inventory/serverInventory";
import {ServerFramework} from "./bridge/framework/serverFramework";
import {Greetings} from "../common";
import {VersionChecker} from './version/versionChecker';

//##[DO NOT REMOVE]################
const CURRENT_VERSION = GetResourceMetadata(cache.resource, 'version', 0);
// edit this URL to point to your own version file
const VERSION_URL = 'https://vidkol18.github.io/versions.json';
const RESOURCE_NAME = GetCurrentResourceName();

const versionChecker = new VersionChecker(CURRENT_VERSION, VERSION_URL, RESOURCE_NAME);
versionChecker.checkVersion();

const serverInventory: ServerInventory = initializeServerInventory();
export const serverFramework: ServerFramework = initializeServerFramework(serverInventory);
//#################################

Greetings();

if (Config.EnableNuiCommand) {
    addCommand('openNui', async (playerId) => {
        if (!playerId) return;

        emitNet(`${cache.resource}:openNui`, playerId);
    });
}


