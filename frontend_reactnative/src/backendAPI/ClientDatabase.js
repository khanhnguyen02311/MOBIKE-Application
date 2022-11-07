import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVersion, getPermissions, getCities, getDistricts, getWards, getImageTypes } from './BackendAPI';

const LOCATIONS = 'Locations';
const PERMISSIONS = 'Permissions';
const IMAGETYPES = 'ImageTypes';

export const init = async () => {
    try {
        let isCientDatabaseInitialized = await AsyncStorage.getItem('ClientDatabaseInitted');
        if (!isCientDatabaseInitialized) {
            console.log('Initializing client database');
            AsyncStorage.setItem('ClientDatabaseInitted', '1');
            await AsyncStorage.setItem('ClientDatabaseVersion',JSON.stringify({
                Locations: 0,
                Permissions: 0,
                ImageTypes: 0
            }));
        }



        console.log('Client database initialized');
    } catch (error) {
        console.log("Init client database error: " + error);
    }
}

const updateLocations = async () => {
    try {
        const onlineLocationsVersion = (await getVersion(LOCATIONS)).version;
        if (onlineLocationsVersion < (await AsyncStorage.getItem('ClientDatabaseVersion')).Locations) return;
        
        const onlineLocations = await BackendAPI.getLocations();
        await AsyncStorage.setItem(LOCATIONS, JSON.stringify(onlineLocations));
        const version = (await AsyncStorage.getItem('ClientDatabaseVersion'));
        version.Locations = onlineLocationsVersion;
        await AsyncStorage.setItem('ClientDatabaseVersion', JSON.stringify(version));
            
    } catch (error) {
        console.log("Update locations error: " + error);
    }

}

export const printClientDatabase = async () => {
    try {
        let isClientDatabaseInitialized = await AsyncStorage.getItem('ClientDatabaseInitted');
        if (isClientDatabaseInitialized) {
            let version = await AsyncStorage.getItem('ClientDatabaseVersion');
            console.log("ClientDatabaseVersion: " + version);
            let locations = await AsyncStorage.getItem(LOCATIONS);
            console.log("Locations: " + locations);
            let permissions = await AsyncStorage.getItem(PERMISSIONS);
            console.log("Permissions: " + permissions);
            let imageTypes = await AsyncStorage.getItem(IMAGETYPES);
            console.log("ImageTypes: " + imageTypes);
        } else {
            console.log('ClientDatabase has not initialized');
        }
    } catch (e) {
        console.log("Print client database error: " + e);
    }
}

export const test = async () => {
    try {
        // let locVer = await getVersion(LOCATIONS);
        // console.log("Location version: " + (locVer.Version+1));
        // let permVer = await getVersion(PERMISSIONS);
        // console.log("Permission version: " + JSON.stringify(permVer));
        // let imgVer = await getVersion(IMAGETYPES);
        // console.log("ImageType version: " + JSON.stringify(imgVer));
        let ward = await getWards();
        console.log("Wards: " + JSON.stringify(ward));
    } catch (error) {
        console.log(error);
    }
}

