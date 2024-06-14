import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'flex-start',
        marginHorizontal: 15,
        top: 15,
    },
    info: {
        fontWeight: "200"
    },
    texto: {
        top: 20,
        fontSize: 15,
        fontWeight: "700"
    },
    dispositivos: {
        flexDirection: "row",
        alignSelf: "center",
        top: 30,
        padding: 25,
        backgroundColor: '#d3d3d3',
        borderRadius: 20,
        width: "95%",
        marginTop: 15,
        borderWidth: 1,
    },
    dentroTexto: {
        padding: 10,
    },
    textoDispositivo: {
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '300',
    },
})
export default styles;