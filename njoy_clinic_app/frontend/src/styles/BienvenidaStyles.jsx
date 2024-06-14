// bienvenidaStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 300,
  },
  buttonHome: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 150,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000', 
  },
  buttonLogin: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 150,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
  },
});

export default styles;
