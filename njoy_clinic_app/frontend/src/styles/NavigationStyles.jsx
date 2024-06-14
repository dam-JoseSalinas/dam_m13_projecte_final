// drawerStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column'
  },
  containerDark: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    backgroundColor: '#222',
  },
  profileImage: {
    borderRadius: 1000,
    width: 100,
    height: 100,
  },
  name: {
    top: 10,
    fontSize: 17,
    fontWeight: '500',
  },
  text: { 
    top: 15,
    fontWeight: '200',
  }, 
  modoOscuro: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 30,
    right: 1,
    width: 285, 
    paddingHorizontal: 30,
    marginTop: 300,
  },
  switchText: {
    fontSize: 15,
    fontWeight: '100',
    marginLeft: 10, 
  },
  iconSearch: {
    marginHorizontal: 5,
  },
});

export default styles;
