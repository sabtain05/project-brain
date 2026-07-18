export interface UpdateInfo {
    current: string;
    latest: string;
    updateAvailable: boolean;
}

export function checkForUpdates(): UpdateInfo {

    return {

        current: "0.1.0",

        latest: "0.1.0",

        updateAvailable: false

    };

}