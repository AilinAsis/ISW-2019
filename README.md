# Plan de SCM

## Estructura del repositorio

```
ISW-2019/
├── 01 Líneas Base
│   └── LB-01-Primera parte de la materia
│       ├── DOC-LB01-01-Filminas-Introducción a Cursada.pdf
│       ├── DOC-LB01-02-Filminas-Ing de Software.pdf
│       ├── DOC-LB01-03-Filminas-Componentes de Proy de Software.pdf
│       ├── DOC-LB01-04-Filminas-Lean Agile.pdf
│       ├── DOC-LB01-05-Filminas-User Stories.pdf
│       ├── DOC-LB01-06-Filminas-SCM.pdf
│       ├── DOC-LB01-07-Documentos de la cátedra-Bibliografía 2019.pdf
│       ├── DOC-LB01-08-Documentos de la cátedra-Modalidad Académica 2019.pdf
│       ├── DOC-LB01-09-Guías de Trabajo-Ejercicios Resueltos.pdf
│       ├── DOC-LB01-10-Guías de Trabajo-Enunciados De Trabajos Prácticos evaluables.pdf
│       └── DOC-LB01-11-Guías de Trabajo-Lineamientos para trabajos teóricos.pdf
├── 02 Filminas
│   ├── FC-01-Introducción a Cursada.pdf
│   ├── FC-02-Ing de Software.pdf
│   ├── FC-03-Componentes de Proy de Software.pdf
│   ├── FC-04-Lean Agile.pdf
│   ├── FC-05-User Stories.pdf
│   ├── FC-06-SCM.pdf
│   ├── FC-07-Testing primera parte.pdf
│   ├── FC-08-Testing segunda parte.pdf
│   ├── FC-09-Metricas.pdf
│   └── FC-10-Kanban.pdf
├── 03 Trabajos evaluables
│   └── Trabajos conceptuales
│       └── TC-01-Integración continua.pdf
├── 04 Documentos de la cátedra
│   ├── Bibliografía-2019.pdf
│   └── MOD-ACAD-ISW-2019.pdf
├── 05 Guías de trabajos
│   ├── GT-Ejercicios Resueltos.pdf
│   ├── GT-Enunciados De Trabajos Prácticos evaluables.pdf
│   └── GT-Lineamientos para trabajos teóricos.pdf
├── 06 Material de Clase
│   ├── MC-01-Cartas de Poker Estimations-Practico.pdf
│   ├── MC-02-Dinamicas de Scrum-Practico.pdf
│   └── MC-03-Buenas Practicas de Java Script-Practico.pdf
├── 07 Notas
│   └── NC-20190830-Gestión de Configuración-Teorica.docx
├── 08 Resúmenes
│   ├── R-Desconocido-2019.docx.docx
│   └── R-Gonzalo Martinez-2019.docx.docx
├── 09 Implementacion
│   ├── css
│   │   ├── bootstrap.css
│   │   ├── bootstrap.css.map
│   │   ├── bootstrap-grid.css
│   │   ├── bootstrap-grid.css.map
│   │   ├── bootstrap-grid.min.css
│   │   ├── bootstrap-grid.min.css.map
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap.min.css.map
│   │   ├── bootstrap-reboot.css
│   │   ├── bootstrap-reboot.css.map
│   │   ├── bootstrap-reboot.min.css
│   │   └── bootstrap-reboot.min.css.map
│   ├── img
│   │   ├── delivery.jpeg
│   │   └── success-icon.png
│   ├── index.html
│   ├── js
│   │   ├── angular.min.js
│   │   ├── app.js
│   │   ├── bootstrap.bundle.js
│   │   ├── bootstrap.bundle.js.map
│   │   ├── bootstrap.bundle.min.js
│   │   ├── bootstrap.bundle.min.js.map
│   │   ├── bootstrap.js
│   │   ├── bootstrap.js.map
│   │   ├── bootstrap.min.js
│   │   └── bootstrap.min.js.map
│   ├── misCSS
│   │   └── General.css
│   └── successful.html
└── README.md
```

## Listado de Ítems de Configuración

| Nombre                         | Regla de nombrado                                           | Ubicación física                              |
| ------------------------------ | ------------------------------------------------------------|-----------------------------------------------|
| Líneas Base                    | LB-\<nro\>-\<nombreLB\>.\<extensión\>                       | /01 Líneas Base                               |
| Documentos de Línea Base       | DOC-\<idLíneaBase\>-\<nro\>-\<ambito\>.\<extensión\>        | /01 Líneas Base/LB-\<nro\>-\<nombreLB\>       || Filminas de clases             | FC-\<nro\>-\<tema\>.pdf                                     | /02 Filminas                                  |
| Trabajos prácticos             | TP-\<nro\>-\<tema\>.xlsx                                    | /03 Trabajos evaluables/Trabajos prácticos    |
| Trabajos conceptuales          | TC-\<nro\>-\<tema\>.pdf                                     | /03 Trabajos evaluables/Trabajos conceptuales |
| Modalidad académica            | MOD-ACAD-ISW\<YYYY\>.pdf                                    | /04 Documentos de la cátedra                  |
| Guías de trabajo               | GT-\<nombreGT\>.pdf                                         | /05 Guías de trabajos                         |
| Material de trabajo para clase | MC-\<nro\>-\<tema\>-\<tipo\>.pdf                            | /06 Material de clase                         |
| Notas de clase                 | NC-\<YYYYMMDD\>-\<tema\>-\<tipo\>.docx                      | /07 Notas                                     |
| Resúmenes                      | R-\<autor/es\>-\<YYYY\>.\<extensión\>                       | /08 Resúmenes                                 |
| Ejercicios resueltos           | EJ-\<nro\>-\<unidad\>-\<tema\>.\<extensión\>                | /09 Ejercicios resueltos                      |
| Bibliografía                   | Bibliografia\<YYYY\>.pdf                                    | /04 Documentos de la cátedra                  |
| Plan de SCM                    | README.md                                                   | /                                             |

## Glosario

| Sigla           | Significado                                                                      |
| --------------- | ---------------------------------------------------------------------------------|
| \<nro\>         | Número cardinal empezando en 01.                                                 |
| \<tema\>        | Breve descripción del tema central del que trata el ítem de configuración.       |
| \<YYYY\>        | Fecha del ítem de configuración en formato numérico (Año).                       |
| \<nombreGT\>    | Nombre que identifica a la Guía de Trabajos Prácticos.                           |
| \<nombreLB\>    | Nombre que identifica a la Línea Base.                                           |
| \<tipo\>        | Tipo de nota de clase. Puede ser teórica o práctica.                             |
| \<YYYYMMDD\>    | Fecha del ítem de configuración en formato numérico (AñoMesDía).                 |
| \<extensión\>   | Nombre de la extensión de un archivo identificado como ítem de configuración.    |
| \<idLíneaBase\> | Sigla que indica con que línea base se corresponde cada documento de línea base. |
| \<ambito\>      | Ámbito del documento de línea base que indica de que tipo de documento se trata. |

## Criterio para la creación de lineas base

Los momentos en los que se van a definir las lineas base serán dos. La primera linea base será creada luego de rendir el primer parcial y la otra luego del segundo.
