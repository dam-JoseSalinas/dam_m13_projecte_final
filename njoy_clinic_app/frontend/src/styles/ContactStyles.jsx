import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
    },
    content: { 
        flex: 1,
        paddingTop: 22,
    },
    title: {
        marginTop: 25,
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    /** Section */
    section: {
        marginTop: 12,
        paddingLeft: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
    },
    sectionItems: {
        marginTop: 1,
    },
    /** Card */
    card: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardWrapper: {
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    cardImg: {
        width: 42,
        height: 42,
        borderRadius: 12,
    },
    cardAvatar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9ca1ac',
    },
    cardAvatarText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardBody: {
        marginRight: 'auto',
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    cardPhone: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: '500',
        color: '#616d79',
        marginTop: 3,
    },
    cardAction: {
        paddingRight: 16,
    },
    search: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#d3d3d3',
        padding: 6,
        borderRadius: 20,
        width: '90%',
        borderWidth: 1,
    },
    iconSearch: {
        marginLeft: "auto"
    },
    textInput: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
    },
    fondoNombre: {
        flexDirection: 'row',
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 30,
        marginTop: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: "center",
        borderWidth: 1,
    },
    foto: {
        padding: 10,
    },
    fotoPerfil: {
        marginLeft: "auto",
    },
    nombre: {
        fontSize: 17,
        fontWeight: '500',
        color: '#333',
        flex: 1,
    },
    contactos: {
        justifyContent: "center",
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    contacto: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    call: {
        marginLeft: 7,
    },
    chat: {
        marginLeft: "auto"
    },
    contactoFoto: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    contactoNombre: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    profileImage: {
        borderRadius: 1000,
        width: 40,
        height: 40,
    },
});

export default styles;