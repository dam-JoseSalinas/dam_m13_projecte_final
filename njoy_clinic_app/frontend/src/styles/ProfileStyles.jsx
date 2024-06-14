import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  profileInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    borderRadius: 1000,
    width: 40,
    height: 40,
  },
  textosProfile: {
    flex: 1,
    marginLeft: 40,
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  editText: {
    fontSize: 16,
    color: '#3498db',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 15,
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 16,
    color: '#777777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  buttonEditProfile: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '45%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '45%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  textButton: {
    fontWeight: '300',
  },
  styleCalendario: {
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '93%',
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    alignSelf: 'center',
  },
  header2: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  flatList: {
    width: '100%',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventTitle: {
    fontSize: 18,
    flex: 1,
  },
  editButton: {
    color: 'black',
    marginLeft: 10,
    fontWeight: '200',
  },
  deleteButton: {
    color: 'black',
    marginLeft: 10,
    fontWeight: '200'
  },
  cancelButton: {
    color: 'gray',
    marginLeft: 10,
  },
  eventDate: {
    fontSize: 16,
    color: '#666',
  },
  eventDetails: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  dateTimeContainer: {
    marginBottom: 10,
  },
  dateTimeText: {
    color: 'black',
    fontWeight: '300',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '25%',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    width: '25%',
    borderRadius: 10,
    borderWidth: 1,
  },
  containerlist: {
    flex: 1,
    marginTop: 20,
  },
  containerFlalist: {
    marginHorizontal: 10,
  },
});

export default styles;