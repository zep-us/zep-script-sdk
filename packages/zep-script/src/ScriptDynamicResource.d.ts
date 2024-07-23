export type ScriptDynamicResource = {
    int: number,
    name: string,
    type: string,
    body: string,
    frameWidth: number,
    frameHeight: number,
    anims: Record<string, number[]> | null,
    frameRate: number,
};
