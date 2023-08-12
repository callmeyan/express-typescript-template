export type PvUvModel = {
    id: number;
    uid: number;
    uuid: number;
    type: 'pv' | 'uv' | string;
    location: string;
    resolution: string;
    browser: string;
    path: string;
    referrer: string;
    data: any;
    create_time: string;
}