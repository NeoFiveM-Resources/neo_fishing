import {IsBrowser, ResourceName} from './resource';

export function LoadFile(path: string) {
    return LoadResourceFile(ResourceName, path);
}

export function LoadJsonFile<T = unknown>(path: string): T {
    if (!IsBrowser) return JSON.parse(LoadFile(path)) as T;

    // @ts-ignore
    const resp = fetch(`/${path}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    });

    return resp.then((response: any) => response.json()) as T;
}
