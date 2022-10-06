import { AsyncStorage } from 'react-native'; 

export default initTokenStorage = async () => {
    try {
        let isTokenStorageInitialized = await AsyncStorage.getItem('TokenStorageInitted');
        if (!isTokenStorageInitialized) {
            console.log('Initializing token storage');
            AsyncStorage.setItem('TokenStorageInitted', '1');
            AsyncStorage.setItem('CurrentToken', '');
            let tokenStorage = {}
            AsyncStorage.setItem('TokenStorage', JSON.stringify(tokenStorage));
        } else {
            console.log('TokenStorage already initialized');
        }
    } catch (e) {
        console.log("Init token storage error: " + e);
    }
}