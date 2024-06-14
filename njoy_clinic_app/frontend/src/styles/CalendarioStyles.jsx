import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'center',
        top: 120,
        left: 0,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },

    buttonText: {
        alignSelf: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#d3d3d3',
        marginHorizontal: 15,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontWeight: '300',
        fontSize: 16,
        textAlign: 'center',
    },
    textInput: {
        height: 40,
        width: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: '#808080',
        marginBottom: 10,
        paddingLeft: 10,
    },
    timeText: {
        fontSize: 18,
        marginBottom: 10,
        textDecorationLine: 'underline',
    },
});

export default styles;