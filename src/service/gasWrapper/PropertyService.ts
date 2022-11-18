/**
 * Gets a property from script
 * 
 * @param key Property key
 * @returns Returns the property value
 */
export function getProperty(key: string): string?s {
    return PropertiesService.getScriptProperties().getProperty(key);
}