import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  backGrd: {
    backgroundColor: '#333333',
  },
  ell: {
    borderWidth: 1,
    borderColor: 'black',
    borderLeftColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    height: 400,
    width: 290,
    borderWidth: 2,
    borderColor: 'black',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderColor: 'red',
    marginTop: 15,
    borderWidth: 1,
    width: 225,
  },
  cropButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#1a1a1a',
    width: 225,
    borderColor: 'red',
    borderWidth: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: '#1a1a1a',
    marginTop: 10,
    height: 150,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
});
