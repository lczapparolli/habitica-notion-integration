/**
 * Gets a property from script
 * 
 * @param key Property key
 * @returns Returns the property value
 */
export function getProperty(key: string) {
    return PropertiesService.getScriptProperties().getProperty(key);
}