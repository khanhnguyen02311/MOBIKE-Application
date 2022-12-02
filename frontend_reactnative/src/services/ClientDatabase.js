import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVersion, getPermissions, getCities, getDistricts, getWards, getImageTypes } from '../backendAPI';
import Store from '../redux/store';
import { setCities, setDistricts, setWards } from '../redux/clientDatabase/location';
import { setImageTypes } from '../redux/clientDatabase/imageType';
import { setPermissions } from '../redux/clientDatabase/permission';

const LOCATIONS = 'Locations';
const PERMISSIONS = 'Permissions';
const IMAGETYPES = 'ImageTypes';

export const init = async () => {
    try {
        let isCientDatabaseInitialized = await AsyncStorage.getItem('ClientDatabaseInitted');
        if (!isCientDatabaseInitialized) {
            console.log('Initializing client database');
            AsyncStorage.setItem('ClientDatabaseInitted', '1');
            await AsyncStorage.setItem('ClientDatabaseVersion', JSON.stringify({
                Locations: 0,
                Permissions: 0,
                ImageTypes: 0
            }));
        }

        // let Locations = undefined;
        // let Permissions = undefined;
        // let ImageTypes = undefined;
        
        // await Promise.all([updateLocations(), updatePermissions(), updateImageTypes()]).then((res) => {
        //     [Locations, Permissions, ImageTypes] = res;
        // });

        // Store.dispatch(setCities(JSON.parse(Locations).Cities));
        // Store.dispatch(setDistricts(JSON.parse(Locations).Districts));
        // Store.dispatch(setWards(JSON.parse(Locations).Wards));
        // Store.dispatch(setPermissions(JSON.parse(Permissions)));
        // Store.dispatch(setImageTypes(JSON.parse(ImageTypes)));

        await updateAndLoadClientDatabase();
        
        console.log('Client database initialized');
    } catch (error) {
        console.log("Init client database error: " + error);
    }
}

const updateAndLoadClientDatabase = async () => {
    try {
        await Promise.all([updateLocations(), updatePermissions(), updateImageTypes()]).then((res) => {
            Store.dispatch(setCities(JSON.parse(res[0]).Cities));
            Store.dispatch(setDistricts(JSON.parse(res[0]).Districts));
            Store.dispatch(setWards(JSON.parse(res[0]).Wards));
            Store.dispatch(setPermissions(JSON.parse(res[1])));
            Store.dispatch(setImageTypes(JSON.parse(res[2])));
        });
    } catch (error) {
        console.log("Update and load client database error: " + error);
    }
}

const updateLocations = async () => {
    try {
        const onlineLocationsVersion = (await getVersion(LOCATIONS)).Version;
        // console.log('Online locations version: ' + onlineLocationsVersion);
        const localLocationsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).Locations;
        // console.log('Local locations version: ' + localLocationsVersion);
        if (localLocationsVersion >= onlineLocationsVersion) {
            console.log('Locations are up to date');
            return await AsyncStorage.getItem(LOCATIONS);
        }

        console.log("Updating locations");

        let wards = undefined;
        let districts = undefined;
        let cities = undefined;

        await Promise.all([getWards(), getDistricts(), getCities()]).then((res) => {
            console.log("Get locations from server successfully");
            [wards, districts, cities] = res;
        })

        const Locations = {
            Cities: cities,
            Districts: districts,
            Wards: wards
        }

        await AsyncStorage.setItem(LOCATIONS, JSON.stringify(Locations));

        const version = {
            Locations: onlineLocationsVersion,
        }
        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Locations updated, current version: " + onlineLocationsVersion);

        return Locations;

    } catch (error) {
        console.log("Update locations error: " + error);
    }
}

const updatePermissions = async () => {
    try {
        const onlinePermissionsVersion = (await getVersion(PERMISSIONS)).Version;
        // console.log('Online permissions version: ' + onlinePermissionsVersion);
        const localPermissionsVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).Permissions;
        // console.log('Local permissions version: ' + localPermissionsVersion);
        if (localPermissionsVersion >= onlinePermissionsVersion) {
            console.log('Permissions are up to date');
            return await AsyncStorage.getItem(PERMISSIONS);
        }

        console.log("Updating permissions");

        const Permissions = await getPermissions();

        await AsyncStorage.setItem(PERMISSIONS, JSON.stringify(Permissions));

        const version = {
            Permissions: onlinePermissionsVersion,
        }
        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Permissions updated, current version: " + onlinePermissionsVersion);

        return Permissions;

    } catch (error) {
        console.log("Update permissions error: " + error);
    }
}

const updateImageTypes = async () => {
    try {
        const onlineImageTypesVersion = (await getVersion(IMAGETYPES)).Version;
        // console.log('Online image types version: ' + onlineImageTypesVersion);
        const localImageTypesVersion = JSON.parse(await AsyncStorage.getItem('ClientDatabaseVersion')).ImageTypes;
        // console.log('Local image types version: ' + localImageTypesVersion);
        if (localImageTypesVersion >= onlineImageTypesVersion) {
            console.log('Image types are up to date');
            return await AsyncStorage.getItem(IMAGETYPES);
        }

        console.log("Updating image types");

        const ImageTypes = await getImageTypes();

        await AsyncStorage.setItem(IMAGETYPES, JSON.stringify(ImageTypes));

        const version = {
            ImageTypes: onlineImageTypesVersion,
        }
        await AsyncStorage.mergeItem('ClientDatabaseVersion', JSON.stringify(version));
        console.log("Image types updated, current version: " + onlineImageTypesVersion);

        return ImageTypes;

    } catch (error) {
        console.log("Update image types error: " + error);
    }
}

export const print = async () => {
    try {
        let isClientDatabaseInitialized = await AsyncStorage.getItem('ClientDatabaseInitted');
        if (isClientDatabaseInitialized) {
            let version = await AsyncStorage.getItem('ClientDatabaseVersion');
            console.log("ClientDatabaseVersion: " + version);
            let locations = JSON.parse(await AsyncStorage.getItem(LOCATIONS));
            console.log("Locations: ");
            console.log("\tCities: " + locations.Cities.length);
            console.log("\tDistricts: " + locations.Districts.length);
            console.log("\tWards: " + locations.Wards.length);
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

export default {init, print}

