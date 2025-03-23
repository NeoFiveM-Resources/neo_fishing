import {TargetBase} from "./targetBase";
import {Vector3} from "@nativewrappers/fivem";

export class InteractTarget extends TargetBase {

    addTargetEntity(entity: number, data: any, distance?: number, offset?: Vector3) {
        exports.interact.AddLocalEntityInteractions({
            entity: entity,
            interactDst: distance,
            offset: offset,
            options: data,
        });
    }

    removeTargetEntity(entity: number, data: any) {
        exports.interact.RemoveLocalEntityInteractions(entity, data);
    }
}
