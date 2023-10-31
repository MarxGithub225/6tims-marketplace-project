import * as heic2any from 'heic2any';

export function transformArray(arr: any[]) {
    if (arr && arr?.length > 0) {
        return arr?.map((item: any, index) => ({ value: item.id, name: item.name, groupId: item.group_id, groupName: item?.group?.name }));
    } else {
        return []
    }
}


export function transformArrayForAsyncOptions(arr: any[]) {
    if (arr && arr?.length > 0) {
        return arr?.map((item: any, index) => ({ value: item.id || -1, label: item.name }));
    } else {
        return []
    }
}

export function transformArrayForSimilarCarOptions(arr: any[]) {
    if (arr && arr?.length > 0) {
        return arr?.map((item: any, index) => ({ value: item?.id, label: item?.name, mainImage: item.mainImage }));
    } else {
        return []
    }
}
export function transformArrayForCategoryOptions(arr: any[]) {
    if (arr && arr?.length > 0) {
        return arr?.map((item: any, index) => ({ value: item?.id, label: item?.name, image: item?.image }));
    } else {
        return []
    }
}
export function canDesactivate(profil: any, connectedUser: any) {
    return !(profil?.id === connectedUser?.id || connectedUser?.roles[0]?.name?.toLowerCase() !== 'admin');
}

export function canUpdateRole(profil: any, connectedUser: any) {
    return profil?.id !== connectedUser?.id && connectedUser?.roles[0]?.name?.toLowerCase() === 'admin' && profil?.roles[0]?.group_id === 2;
}

export function canUpsertRole(role: any) {
    return !(role?.name?.toLowerCase() === 'admin');
}

function renderCarSettingsKeyName(key: string) {
    return `${key.slice(0, key.length - 1)}Ids`
}

export function convertToObjectArray(data: any) { // AllCarSettings
    let resultArray: any[] = [];
    Object.keys(data).forEach((key: string) => {
        if (Array.isArray(data[key])) {
            // resultArray = [...resultArray, ...data[key].map((item: any) => ({ ...item }))];
            resultArray = [...resultArray, {
                label: `${key.split('_')[0]} ${key.split('_')[1] ? key.split('_')[1] : ''}`,
                name: renderCarSettingsKeyName(key),
                options: data[key].map((item: any) => ({
                    label: item.name,
                    value: item.id,
                    selected: false,
                })),
            }]
        }
    });
    return resultArray;
}

export function parseObjectArray(arr: any[]) {
    if (arr && arr?.length > 0) {
        return arr?.map((item: any, index) => ({ value: item.id, name: item.name }));
    } else {
        return []
    }
}

export function convertToSlug(inputString: string) {
    return inputString.toLowerCase().replace(/\s+/g, '-');
}

export function convertToRegularString(slug: string) {
    return slug.split('-').map(word => word.charAt(0) + word.slice(1)).join(' ');
}

export const updatedArray = (array: any, element: any) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === element.id) {
            array[i] = element;
            break;
        }
    }
    return array;
};

export const sanitizerInput = (input: string) => {
    return input.replace(/[^a-z]/gi, '').toLowerCase();
}

function valueToHex(c: number) {
    var hex = c.toString(16);
    return hex
}

export function rgbToHex(r: number, g: number, b: number) {
    return (`#${valueToHex(r)}${valueToHex(g)}${valueToHex(b)}`);
}
