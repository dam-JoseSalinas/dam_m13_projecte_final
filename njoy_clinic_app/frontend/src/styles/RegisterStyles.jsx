// registerStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginBottom: 15,
    },
    content: {
        width: '90%',
        paddingTop: 20,
    },
    title: {
        fontWeight: '200',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'gray',
        backgroundColor: '#fffafa',
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#d3d3d3',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
    },
});

export default styles;
