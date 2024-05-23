# FE-TramitEase

Este repositorio contiene el frontend del proyecto TramitEase, una solución para optimizar la gestión y seguimiento de trámites generales en Bolivia. El proyecto está desarrollado con **React** y **Vite**, utilizando **TypeScript** y siguiendo la arquitectura **Sliced Design** para organizar el código de manera estructurada y modular.

## Versionamiento
Se opto por usar el versionamiento semantico por lo que el front end contiene un workflow sobre este.

## Estructura del Proyecto

La estructura del proyecto sigue la arquitectura Sliced Design, organizada en las siguientes carpetas:

1. **assets**
2. **common**
3. **components**
4. **constants**
5. **features**
6. **hooks**
7. **pages**
8. **services**
9. **theme**
10. **utils**

A continuación, se detalla la función de cada una de estas carpetas:

### assets

La carpeta `assets` contiene todos los recursos estáticos utilizados en la aplicación, como imágenes, fuentes, iconos, y archivos de estilos globales.

### common

La carpeta `common` incluye componentes, utilidades y funciones que son compartidas entre diferentes partes de la aplicación. Esta carpeta ayuda a evitar la duplicación de código y promueve la reutilización.

### components

La carpeta `components` contiene los componentes reutilizables de la interfaz de usuario que se utilizan en toda la aplicación. Estos pueden ser botones, cuadros de diálogo, formularios, etc. Cada componente debe estar encapsulado y ser independiente.

### constants

La carpeta `constants` contiene todos los valores constantes y configuraciones utilizadas en la aplicación, como URLs de APIs, claves de configuración, y otros valores que no cambian durante la ejecución del programa.

### features

La carpeta `features` organiza el código basado en las funcionalidades específicas de la aplicación. Cada funcionalidad puede tener sus propios componentes, hooks, y lógica de estado. Esto ayuda a mantener el código modular y enfocado.

### hooks

La carpeta `hooks` contiene hooks personalizados de React que encapsulan lógica de estado y efectos que pueden ser reutilizados en diferentes componentes. Esto permite una mejor organización y reutilización de lógica compartida.

### pages

La carpeta `pages` contiene los componentes de página que representan las diferentes vistas o rutas de la aplicación. Cada página puede estar compuesta por múltiples componentes y puede conectarse con el estado global o servicios externos.

### services

La carpeta `services` contiene código que interactúa con APIs externas, realiza solicitudes HTTP, y maneja la lógica de negocio que no pertenece a los componentes directamente. Esto ayuda a mantener los componentes enfocados en la representación de la UI.

### theme

La carpeta `theme` contiene la configuración de temas y estilos globales de la aplicación. Aquí se definen colores, tipografías, y otros estilos que se aplican de manera consistente en toda la aplicación.

### utils

La carpeta `utils` incluye funciones utilitarias y helpers que son utilizados en toda la aplicación. Estas funciones suelen ser puras y no dependen del estado de la aplicación, lo que facilita su prueba y reutilización.

## Configuración del Proyecto

Para configurar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio:
    ```bash
    git clone git@github.com:ProyectoDeGradoTramitadores/FE-TramitEase.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd TramitEase
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu feature o bugfix:
    ```bash
    git checkout -b Type/TE-Nº-How-Realize
    ```
3. Realiza tus cambios y haz commits:
    ```bash
    git commit -m "TE-Nº: Agrega mi feature"
    ```
4. Empuja tus cambios a tu fork:
    ```bash
    git push origin Type/TE-Nº-How-Realize
    ```
5. Crea un Pull Request en este repositorio.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

¡Gracias por contribuir a FE-TramitEase!
