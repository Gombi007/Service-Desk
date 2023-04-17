export enum State {
    Waiting_A_Part = 'Waiting a part',
    Waiting_A_Worker = 'Waiting a technician ',
    In_Progress = 'In Progress',
}

export const LANG_EN_STATE: { [key in keyof typeof State]: string } = {
    Waiting_A_Part: 'Waiting a part',
    Waiting_A_Worker: 'Waiting a technician ',
    In_Progress: 'In Progress',
}

export const LANG_HU_STATE: { [key in keyof typeof State]: string } = {
    Waiting_A_Part: 'Alkatrészre vár',
    Waiting_A_Worker: 'Teknikusra vár',
    In_Progress: 'Folyamatban',
}