import { CURRENT_VERSION } from "../utils/version.js";


export interface UpdateInfo {
    current: string;
    latest: string;
    updateAvailable: boolean;
}

export function checkForUpdates(): UpdateInfo {

    return {

        current: CURRENT_VERSION,
        latest: CURRENT_VERSION,

        updateAvailable: false

    };

}