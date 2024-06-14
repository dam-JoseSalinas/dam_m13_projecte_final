import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    scroll: {
        width: '100%',
    },
    scrollContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonesTitulo: {
        alignItems: 'center',
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    containerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "black"
    },
    divierte: {
        flexDirection: "row", 
        flexWrap: "wrap", 
        //justifyContent: "space-evenly", 
        backgroundColor: '#d3d3d3', 
        padding: 20, 
        borderRadius: 20, 
        marginTop: 20, 
        width: '80%',
        borderWidth: 1,
    },
    fondoIcon: {
        marginHorizontal: 4,
        marginVertical: 15,
        flexBasis: '30%',
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "#fff",
        padding: 9,
        borderRadius: 25,
        borderWidth: 1,
        margin: '1%',
        alignItems: 'center',
    },
});

export default styles;
