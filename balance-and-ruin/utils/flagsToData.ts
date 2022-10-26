import { RawFlagMetadata } from "~/constants/flagMetadata";
import { FlagValues } from "./FlagProvider";

export const flagsToData = (rawFlags: string, metadata: Record<string, RawFlagMetadata>): FlagValues => {
    const flags = rawFlags.split('-').filter(flag => flag).map(flag => `-${flag.trim()}`);
    const vals = Object.entries(metadata);

    return flags.reduce((acc, flag) => {
        const [id, meta] = vals.find((([id, meta]) => flag === meta.flag || flag.startsWith(`${meta.flag} `))) || [];

        /** Use mutually exclusive group when available */
        if (meta?.mutually_exclusive_group) {
            acc[meta.mutually_exclusive_group] = flag;
            return acc;
        } 
        
        if (id) {
            acc[id] = flag;
            return acc;
        }
        
        
        throw new Error(`No object key could be determined for the ${id} flag`)
        
        return acc;
    }, {} as FlagValues);
};