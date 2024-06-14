// loginStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonLog: {
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 150,
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
  },
  buttonReg: {
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 150,
    alignItems: 'center',
    borderWidth: 1,
  },
  buttonGuest: {
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    width: 310,
    alignItems: 'center',
    top: 10,
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: 310,
    borderRadius: 10,
  },
});

export default styles;
