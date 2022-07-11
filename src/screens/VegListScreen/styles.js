import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  formContainer: {
    backgroundColor: '#333333',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listContainer: {
    padding: 10,
    flex: 1,
  },
  entityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingBottom: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'black',
    height: 50,
  },
  entityText: {
    fontSize: 20,
    color: 'white',
    marginTop: 7,
  },
});
