import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const paymentScreen = ({
  route: {
    params: {data},
  },
}) => {
  return (
    <WebView
      scalesPageToFit={true}
      bounces={false}
      javaScriptEnabled
      source={{
        html: `
                  <!DOCTYPE html>
                  <html>
                    <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 "></head> 
                    <body>
                     ${data}
                    </body>
                  </html>
            `,
      }}
      automaticallyAdjustContentInsets={false}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e8b889',
  },
});

export default paymentScreen;
