import {ClientInventory} from "./inventory/clientInventory";
import {ClientFramework} from "./framework/clientFramework";
import {TargetBase} from "./target/targetBase";
import {NotifyBase} from "./notify/notifyBase";
import {OxClientInventory} from "./inventory/oxClientInventory";
import {CoreClientInventory} from "./inventory/coreClientInventory";
import {QbClientInventory} from "./inventory/qbClientInventory";
import {QsClientInventory} from "./inventory/qsClientInventory";
import {OrigenClientInventory} from "./inventory/origenClientInventory";
import {PsClientInventory} from "./inventory/psClientInventory";
import {OxCoreClientFramework} from "./framework/oxCoreClientFramework";
import {QbCoreClientFramework} from "./framework/qbCoreClientFramework";
import {EsxClientFramework} from "./framework/esxClientFramework";
import {QBoxClientFramework} from "./framework/qBoxClientFramework";
import Config from "@common/config";
import {CodeMClientInventory} from "./inventory/codeMClientInventory";
import {OxTarget} from "./target/oxTarget";
import {QbTarget} from "./target/qbTarget";
import {InteractTarget} from "./target/interactTarget";
import {OxLibNotify} from "./notify/oxLibNotify";
import {EsxNotify} from "./notify/esxNotify";
import {QbNotify} from "./notify/qbNotify";
import {SdNotify} from "./notify/sdNotify";
import {WasabiNotify} from "./notify/wasabiNotify";

export function initializeClientInventory(): ClientInventory {
    if (GetResourceState('ox_inventory') === 'started') {
        return new OxClientInventory('ox_inventory');
    } else if (GetResourceState("qb-inventory") === 'started') {
        return new QbClientInventory('qb-inventory');
    } else if (GetResourceState('qs-inventory') === 'started') {
        return new QsClientInventory('qs-inventory');
    } else if (GetResourceState('ps-inventory') === 'started') {
        return new PsClientInventory('qs-inventory');
    } else if (GetResourceState('origen_inventory') === 'started') {
        return new OrigenClientInventory('origen_inventory');
    } else if (GetResourceState('codem-inventory') === 'started') {
        return new CodeMClientInventory('codem-inventory');
    } else if (GetResourceState('core_inventory') === 'started') {
        return new CoreClientInventory('core_inventory');
    }

    console.log('No inventory found, returning undefined');
    return undefined;
}

export function initializeClientFramework(clientInventory: ClientInventory): ClientFramework {
    if (GetResourceState('es_extended') === 'started') {
        return new EsxClientFramework('esx', clientInventory);
    } else if (GetResourceState('qb-core') === 'started') {
        return new QbCoreClientFramework('qb', clientInventory);
    } else if (GetResourceState('ox_core') === 'started') {
        return new OxCoreClientFramework('ox', clientInventory);
    } else if (GetResourceState('qbx_core') === 'started') {
        return new QBoxClientFramework(clientInventory);
    }
    console.error('No framework detected! Things will be very broken!')
    return undefined;
}

export function initializeTarget(): TargetBase {
    if (Config.Setup.target === 'ox_target') {
        return new OxTarget('ox_target');
    } else if (Config.Setup.target === 'qb-target') {
        return new QbTarget('qb-target');
    } else if (Config.Setup.target === 'interact') {
        return new InteractTarget('interact');
    }
    console.log("No valid targeting resource specified in config, returning undefined...")
    return undefined;
}

export function initializeNotify(): NotifyBase {
    if (Config.Setup.notify === 'ox_lib') {
        return new OxLibNotify('ox_lib');
    } else if (Config.Setup.notify === 'esx') {
        return new EsxNotify('esx');
    } else if (Config.Setup.notify === 'qb') {
        return new QbNotify('qb');
    } else if (Config.Setup.notify === 'sd-notify') {
        return new SdNotify('sd-notify');
    } else if (Config.Setup.notify === 'wasabi-notify') {
        return new WasabiNotify('wasabi-notify');
    }
    console.log("No valid notification resource specified in config, returning undefined...")
}
