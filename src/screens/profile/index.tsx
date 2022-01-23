import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Divider, Tab, TabView} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import {userStore} from '../../stores/userStore';

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const profileScreen = observer(() => {
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const [tabIndex, setTabIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.upperPart}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://pngset.com/images/profile-pic-dummy-lamp-armor-transparent-png-913970.png',
          }}
        />
        <Text style={styles.title}>{userStore.name}</Text>
        <View style={styles.profileInfoView}>
          <View style={styles.profileInfoView2}>
            <Text style={styles.profileInfoText1}>Arkadaşlar</Text>
            <Text style={styles.profileInfoText2}>0</Text>
          </View>
          <Divider orientation={'vertical'} width={1} color={'black'} />
          <View style={styles.profileInfoView2}>
            <Text style={styles.profileInfoText1}>Gönderiler</Text>
            <Text style={styles.profileInfoText2}>0</Text>
          </View>
        </View>
      </View>
      <Tab
        value={tabIndex}
        onChange={setTabIndex}
        indicatorStyle={{backgroundColor: 'black'}}>
        <Tab.Item
          title={'Gönderiler'}
          titleStyle={styles.titleStyle}
          containerStyle={{backgroundColor: 'transparent'}}
        />
        <Tab.Item
          title={'Yorumlar'}
          titleStyle={styles.titleStyle}
          containerStyle={{backgroundColor: 'transparent'}}
        />
        <Tab.Item
          title={'Beğeniler'}
          titleStyle={styles.titleStyle}
          containerStyle={{backgroundColor: 'transparent'}}
        />
      </Tab>
      {/* TO DO: Scroll yana ve aşağıya sıkıntı var. */}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TabView value={tabIndex} onChange={setTabIndex}>
          <TabView.Item style={styles.tabViewItem}>
            <Text style={styles.tabViewItemText}>
              Henüz bir gönderiniz bulunmamaktadır.
            </Text>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <Text style={styles.tabViewItemText}>
              Henüz bir yorumunuz bulunmamaktadır.
            </Text>
          </TabView.Item>
          <TabView.Item style={styles.tabViewItem}>
            <Text style={styles.tabViewItemText}>
              Henüz bir beğeniniz bulunmamaktadır.
            </Text>
          </TabView.Item>
        </TabView>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  page: {justifyContent: 'center', alignItems: 'center'},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  upperPart: {
    backgroundColor: '#ffbd7d',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
    width: 125,
    height: 125,
    borderRadius: 70,
    resizeMode: 'contain',
  },
  titleStyle: {
    textTransform: 'none',
    color: 'black',
    fontSize: 17,
  },
  tabViewItem: {
    width: '100%',
    paddingHorizontal: 15,
  },
  tabViewItemText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 40,
  },
  scrollView: {
    flexGrow: 1,
  },
  profileInfoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    width: 300,
    marginTop: 15,
  },
  profileInfoView2: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileInfoText1: {
    fontSize: 18,
    marginHorizontal: 25,
  },
  profileInfoText2: {
    fontSize: 18,
    marginTop: 5,
  },
});
export default profileScreen;
