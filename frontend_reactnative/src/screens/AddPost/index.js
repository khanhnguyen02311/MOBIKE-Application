import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Container from '../../components/common/container';
import * as ImagePicker from 'react-native-image-picker';
import { UploadImage } from '../../backendAPI/HttpRequest';

const AddPost = ({navigation}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {backgroundColor: '#EDF8FF', minHeight: 60, maxHeight: 80},
      });
  }, [navigation]);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  //Set up choose photo
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  // const [filepath, setFilepath] = useState({
  //   data: '',
  //   uri: '',
  // });
  // const [fileData, setFileData] = useState('');
  const [Images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);

  // const chooseImage = () => {
  //   let options = {
  //     title: 'Select Image',
  //     customButtons: [
  //       {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.showImagePicker(options, response => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = {uri: response.uri};

  //       // You can also display the image using data:
  //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  //       // alert(JSON.stringify(response));s
  //       console.log('response', JSON.stringify(response));
  //       // this.setState({
  //       //   filePath: response,
  //       //   fileData: response.data,
  //       //   fileUri: response.uri,
  //       // });

  //       setFilepath({
  //         data: response.data,
  //         uri: response.uri,
  //       });
  //       setFileData(response.data);
  //       setFileUri(response.uri);
  //     }
  //   });
  // };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));

        // setFileData(response.data);
        let tmp = Images;
        for (let i = 0; i < response.assets.length; i++) {
          tmp.push(response.assets[i]);
        }
        setImages(tmp);
        setFlag(!flag);
      }
    });
  };

  const launchImageLibrary = () => {
    let options = {
      selectionLimit: 3,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));

        // setFileData(response.data);
        var tmp = Images;
        for (let i = 0; i < response.assets.length; i++) {
          tmp.push(response.assets[i]);
        }
        setImages(tmp);
        setFlag(!flag);
      }
    });
  };

  const uploadPost = () => {
    console.log('upload post');
    console.log('fileUri', Images);
    UploadImage(Images[0]);
  };

  // const RenderFileData = () => {
  //   if (fileData) {
  //     return (
  //       <Image
  //         source={{uri: 'data:image/jpeg;base64,' + fileData}}
  //         style={styles.images}
  //       />
  //     );
  //   } else {
  //     return (
  //       <Image
  //         source={require('../../assets/images/galeryImages.png')}
  //         style={styles.images}
  //       />
  //     );
  //   }
  // };

  const RenderFileUri = () => {
    console.log('fileUri', Images);
    return (
      <View>
        {Images.map((item, index) => {
          if (item) {
            console.log('item', item);
            return (
              <Image key={index} source={{uri: item.uri}} style={styles.images} />
            );
          } else
            return (
              <Image
                key={index}
                source={require('../../assets/images/image-not-available.png')}
                style={styles.images}
              />
            );
        })}
      </View>
    );
    // if (fileUri) {
    //   return<View></View> <Image source={{uri: fileUri}} style={styles.images} />;
    // } else {
    //   return (
    // <Image
    //   source={require('../../assets/images/image-not-available.png')}
    //   style={styles.images}
    // />
    //   );
    // }
  };

  return (
    <Container styleScrollView={{backgroundColor: 'white'}}>
      <View style={{padding: 20}}>
        <TextInputOutline
          label={'Title'}
          iconClass={MaterialIcons}
          iconName={'title'}
          iconColor={'#90B4D3'}
          inputPadding={12}
          borderWidthtoTop={0}
          onChangeText={value => {
            onChange({name: 'title', value});
          }}
        />
        <TextInputOutline
          label={'Content'}
          iconClass={MaterialIcons}
          iconName={'drive-file-rename-outline'}
          iconColor={'#90B4D3'}
          inputPadding={12}
          borderWidthtoTop={0}
          onChangeText={value => {
            onChange({name: 'content', value});
          }}
        />
        <TextInputOutline
          label={'Price'}
          iconClass={Ionicons}
          iconName={'pricetag'}
          iconColor={'#90B4D3'}
          inputPadding={12}
          borderWidthtoTop={0}
          onChangeText={value => {
            onChange({name: 'price', value});
          }}
        />

        <View style={styles.ImageSections}>
          {/* <View>
            <RenderFileData />
            <Text style={{textAlign: 'center'}}>Base 64 String</Text>
          </View> */}
          <View>
            <RenderFileUri />
            <Text style={{textAlign: 'center'}}>File Uri</Text>
          </View>
        </View>

        <View style={styles.btnParentSection}>
          {/* <TouchableWithoutFeedback onPress={chooseImage}>
            <View style={styles.btnSection}>
              <Text style={styles.btnText}>Choose File</Text>
            </View>
          </TouchableWithoutFeedback> */}

          <TouchableWithoutFeedback onPress={launchCamera}>
            <View style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Camera</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={launchImageLibrary}>
            <View style={styles.btnSection}>
              <Text style={styles.btnText}>Directly Launch Image Library</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={uploadPost}>
            <View style={styles.btnSection}>
              <Text style={styles.btnText}>Upload Post</Text>
              </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Container>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  ImageSections: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
