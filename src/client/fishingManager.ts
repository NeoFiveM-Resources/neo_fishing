import Config from "@common/config";
import {Logger} from '@common/logger/Logger';
import * as lib from '@overextended/ox_lib/client';


export class FishingManager {
    isRunning: boolean = false;
    private managerPed: number;
    private rodObj: number;

    constructor() {
        Logger.debug('FishingManager initialized');
        this.initialize();
    }

    private async initialize() {
        await this.createManagerPed();
    }

    private async createManagerPed() {
        Logger.debug('Getting ped data');
        const pedData = Config.PedData;

        Logger.debug('Requesting ped model');
        lib.requestModel(pedData.model);

        Logger.debug('Creating ped');
        this.managerPed = CreatePed(1, pedData.model, pedData.coords.x, pedData.coords.y, pedData.coords.z - 1, pedData.coords.heading, false, false);

        Logger.debug('Setting ped attributes');
        SetPedCombatAttributes(this.managerPed, 46, true);
        SetPedFleeAttributes(this.managerPed, 0, false);
        SetBlockingOfNonTemporaryEvents(this.managerPed, true);

        SetEntityAsMissionEntity(this.managerPed, true, true);
        FreezeEntityPosition(this.managerPed, true);
        SetEntityInvincible(this.managerPed, true);
        SetPedDiesWhenInjured(this.managerPed, false);
        SetPedHearingRange(this.managerPed, 1.0);
        SetPedAlertness(this.managerPed, 0);

        Logger.debug('Requesting rod model');
        const rodProp = 'prop_fishing_rod_01';
        lib.requestModel(rodProp);

        Logger.debug('Requesting animation dictionary');
        const animDict = 'amb@world_human_stand_fishing@idle_a';
        lib.requestAnimDict(animDict);

        Logger.debug('Playing animation');
        TaskPlayAnim(this.managerPed, animDict, 'idle_b', 2.0, 2.0, -1, 51, 0, false, false, false);
        this.rodObj = CreateObject(rodProp, pedData.coords.x, pedData.coords.y, pedData.coords.z, false, false, false);

        Logger.debug('Attaching rod to ped');
        AttachEntityToEntity(this.rodObj, this.managerPed, GetPedBoneIndex(this.managerPed, 60309), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, true, true, false, true, 1, true);
    }
}
