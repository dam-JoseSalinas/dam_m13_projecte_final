const Themes = {
    light: {
        theme: '#FFFFFF', // Color de fondo en modo claro
        color: '#333333', // Color de texto principal en modo claro
        background: '#FFECB3', // Fondo en modo claro (amarillo claro)
        lineColor: '#FFAB91', // Color de líneas y bordes en modo claro (naranja suave)
        calendarTodayTextColor: '#FF8A65', // Color del texto para la fecha de hoy en modo claro (naranja más intenso)
        logo: require('../assets/images/logo/logoClaro.png'), // Logo en modo claro
        input: '#FFF5F5', // Color de fondo de input en modo claro (rosa claro)
        gradientStart: '#FFECB3', // Color de inicio del degradado en modo claro (amarillo claro)
        gradientEnd: '#FFAB91', // Color de fin del degradado en modo claro (naranja suave)
    },
    dark: {
        theme: '#212121', // Color de fondo en modo oscuro (gris muy oscuro)
        color: '#FFFFFF', // Color de texto principal en modo oscuro
        background: '#37474F', // Fondo en modo oscuro (gris azulado)
        lineColor: '#607D8B', // Color de líneas y bordes en modo oscuro (gris medio)
        calendarTodayTextColor: '#FF8A65', // Color del texto para la fecha de hoy en modo oscuro (naranja intenso)
        logo: require('../assets/images/logo/logoOscuro.png'), // Logo en modo oscuro
        input: '#4E342E', // Color de fondo de input en modo oscuro (marrón oscuro)
        gradientStart: '#607D8B', // Color de inicio del degradado en modo oscuro (gris medio)
        gradientEnd: '#37474F', // Color de fin del degradado en modo oscuro (gris azulado)
    }
}

export default Themes;
