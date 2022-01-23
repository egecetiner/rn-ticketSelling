import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  newRoot: {
    flexDirection: 'column',

    marginVertical: 5,
  },
  pressable1: {
    position: 'absolute',
    zIndex: 1,

    bottom: 230,
    left: 10,
  },
  pressable2: {
    position: 'absolute',
    zIndex: 1,
    bottom: 233,
    left: 318,
  },
  icon: {
    color: 'red',
  },
  icon2: {
    color: 'blue',
  },

  image: {
    flex: 2,
    height: 200,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 0,
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderBottomWidth: 0,
  },

  downContainer: {
    padding: 12,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderRadius: 15,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  downLeftContainer: {
    flex: 26,
    paddingRight: 5,
  },

  downRightContainer: {
    flex: 4,
    paddingLeft: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lokasyon: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 5,
  },
  date: {
    fontSize: 16,
    color: '#2e2e2e',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default styles;
