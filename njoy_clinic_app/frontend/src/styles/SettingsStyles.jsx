import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 22,
    },
    settings:{
        marginHorizontal: 23,
        marginBottom: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    search: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: '#d3d3d3',
        padding: 6,
        borderRadius: 20,
        width: '90%',
        borderWidth: 1,
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },
    iconSearch: {
        marginLeft: "auto",
    },
    cuenta:{
        marginHorizontal: 15,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    configPerfil: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 10,
        marginTop: 5,
        width: '100%',
        alignSelf: "center",
    },
    configNoti: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 10,
        marginTop: 5,
        width: '100%',
        alignSelf: "center",
    },
    configInfo: {
        flexDirection: 'row',
        backgroundColor: '#f8f8ff',
        padding: 10,
        width: '100%',
        alignSelf: "center",
    },
    gestorCuenta: {
        marginHorizontal: 5,
        fontWeight: '600',
        fontSize: 14,
    },
    texto: {
        fontSize: 12,
        fontWeight: '200', 
        marginHorizontal: 6,
    },
    informacion :{
        marginHorizontal: 15,
        marginTop: 8,
        fontWeight: 'bold',
        color: '#333',
    },
    viewDarkMode :{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconsDarkMode:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    textDark:{
        flex: 1,
        flexDirection: "column",
        fontWeight: '600',
    }
})

export default styles;