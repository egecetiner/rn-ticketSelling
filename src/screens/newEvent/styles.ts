import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'center',
    height: 40,
    borderWidth: 2,
    borderColor: '#e47911',
    borderRadius: 8,
    placeholderTextColor: 'black',
  },
  input2: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 5,
    justifyContent: 'flex-start',
    height: 60,
    borderWidth: 2,
    borderColor: '#e47911',
    borderRadius: 8,
    placeholderTextColor: 'black',
  },
  errorLabel: {
    color: 'red',
  },
  image: {
    marginVertical: 5,
    flex: 2,
    height: 200,
    borderRadius: 15,
    borderColor: '#e47911',
    borderWidth: 2,
    backgroundColor: 'white',
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  getNum: {},
  biletContent2: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  biletContent21: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  biletContent22: {
    fontSize: 16,
    fontWeight: '300',
  },
  biletContent23: {
    fontSize: 20,
    paddingTop: 22,

    fontWeight: '400',
  },
  programContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  programContent1: {
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
    width: 323,
  },
  personal: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'space-between',
    alignContent: 'center',

    marginVertical: 5,

    paddingHorizontal: 8,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
    width: 320,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderColor: '#e47911',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginVertical: 5,
    flex: 2,
    height: 200,
    borderRadius: 15,
    borderColor: '#e47911',
    borderWidth: 2,
    backgroundColor: 'white',
  },
});

export default styles;
