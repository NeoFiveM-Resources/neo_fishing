import {OxServerInventory} from "./inventory/oxServerInventory";
import {CoreServerInventory} from "./inventory/coreServerInventory";
import {ServerInventory} from "./inventory/serverInventory";
import {PsServerInventory} from "./inventory/psInventory";
import {QbServerInventory} from "./inventory/qbServerInventory";
import {EsxServerFramework} from "./framework/esxServerFramework";
import {QbCoreServerFramework} from "./framework/qbCoreServerFramework";
import {OxCoreServerFramework} from "./framework/oxServerFramework";
import {ServerFramework} from "./framework/serverFramework";
import {QBoxServerFramework} from "./framework/QBoxServerFramework";

export function initializeServerInventory(): ServerInventory {
    if (GetResourceState('ox_inventory') === 'started') {
        return new OxServerInventory('ox_inventory');
    } else if (GetResourceState("qb-inventory") === 'started') {
        return new QbServerInventory('qb-inventory');
    } else if (GetResourceState('qs-inventory') === 'started') {
        return new ServerInventory('qs-inventory');
    } else if (GetResourceState('ps-inventory') === 'started') {
        return new PsServerInventory('qs-inventory');
    } else if (GetResourceState('origen_inventory') === 'started') {
        return new ServerInventory('origen_inventory');
    } else if (GetResourceState('codem-inventory') === 'started') {
        return new ServerInventory('codem-inventory');
    } else if (GetResourceState('core_inventory') === 'started') {
        return new CoreServerInventory('core_inventory');
    }
    return undefined;
}

export function initializeServerFramework(serverInventory: ServerInventory): ServerFramework {
    if (GetResourceState('es_extended') === 'started') {
        return new EsxServerFramework(serverInventory);
    } else if (GetResourceState('qbx_core') === 'started') {
        return new QBoxServerFramework(serverInventory);
    } else if (GetResourceState('qb-core') === 'started') {
        return new QbCoreServerFramework('qb', serverInventory);
    } else if (GetResourceState('ox_core') === 'started') {
        return new OxCoreServerFramework(serverInventory);
    }
}
