import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { VideoPlayer, Trimmer, ProcessingManager } from 'react-native-video-processing';
import FilePickerManager from 'react-native-file-picker';
var RNFS = require('react-native-fs');

export default class App extends Component {

  openFiles() {
    FilePickerManager.showFilePicker(null, (response) => {

      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        const options = {
          cropWidth: 200,
          cropHeight: 200,
          cropOffsetX: 0,
          cropOffsetY: 0
        }

        ProcessingManager.crop(response.path, options).then(data => {
          RNFS.copyFile(data, RNFS.ExternalDirectoryPath + '/123.mp4')
            .then((result) => {
              alert("Your file is cropped and stored at Phone Storage -> Android -> data -> com.videocrop -> files -> 123.mp4");
              console.log('DONE', result)
            })
            .catch((error) => {
              alert("Your file couldn't be copied to Phone storage, however it's cropped at ,",response.path);
              console.log(error, 'ERROR')
            });

        }).catch(error => {
          alert("Selected file couldn't be cropped");
          console.log('uri error', error)
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.openFiles()}>
          <Text style={styles.instructions}>Choose Any File To Crop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
    fontSize:18
  },
});
