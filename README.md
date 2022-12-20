# Lista de quehaceres
Lista de quehaceres para Code Challenge de PixelPay

## Tech Stack

**Frontend:** HTML, CSS, Javascript, Handlebars
**Backend:** Node, MongoDB
**Deploy:** Railway

## Demo

https://lista-quehaceres.up.railway.app/

## Variables de entorno

Para ejecutar este proyectos, necesitas agregar las siguientes variables de entorno en tu archivo .env

`USER`,
`PASSWORD`,
`DATABASE`

## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/sovilleda07/lista-quehaceres.git
```

Ir al directorio del proyecto

```bash
  cd lista-quehaceres
```

Instalar dependencias

```bash
  npm install
```

Inicia el servidor

```bash
  npm run dev
```

## API Reference

#### Agregar un quehacer
```http
  POST /api/agregarQuehacer
```
| Parámetro | Tipo     | Descripción                                      |
| :-------- | :------- | :----------------------------------------------- |
| `tarea`   | `string` | **Obligatorio**. Nombre del quehacer a registrar |

Retorna en el resultado, el objeto agregado.

#### Consultar todos los quehaceres
```http
  GET /api/quehaceres
```
Retorna un objeto con los resultados.

#### Consultar un quehacer
```http
  GET /api/quehaceres/:id
```
| Parámetro | Tipo     | Descripción                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Obligatorio**. Id del quehacer a consultas |

Retorna un objeto con el resultado.

#### Actualizar un quehacer
```http
  PUT /api/editarQuehacer/:id
```
| Parámetro | Tipo     | Descripción                                  |
| :-------- | :------- | :------------------------------------------- |
| `id`      | `string` | **Obligatorio**. Id del quehacer a consultas |
| `tarea`   | `string` | **Obligatorio**. Nombre que se actualiza     |

Retorna en el resultado, el objeto actualizado.

#### Actualizar el estado de un quehacer
```http
  PUT /api/cambiarEstadoQuehacer/:id
```
| Parámetro | Tipo     | Descripción                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Obligatorio**. Id del quehacer a actualizar |

#### Eliminar un quehacer
```http
  DELETE /api/eliminarQuehacer/:id
```
| Parámetro | Tipo     | Descripción                                   |
| :-------- | :------- | :-------------------------------------------- |
| `id`      | `string` | **Obligatorio**. Id del quehacer a eliminar   |

#### Eliminar los quehaceres completados
```http
  DELETE /api/eliminarQuehaceresCompletados
```
Retorna la cantidad de quehaceres eliminados.

#### Eliminar todos los quehaceres
```http
  DELETE /api/eliminarQuehaceresTodos
```

## Project Structure
```
lista-quehaceres
├─ controllers
│  ├─ api.js
│  ├─ vistas.js
├─ models
│  ├─ Quehacer.js
├─ public
│  ├─ css
│  │  ├─ style.css
│  ├─ img
│  │  ├─ check.svg
│  │  ├─ task.png
│  │  ├─ to-do-list.png
│  ├─ js
│  │  ├─ index.js
├─ routes
│  ├─ index.js
│  ├─ vista.js
├─ views
│  ├─ layouts
│  │  ├─ layout.handlebars
│  ├─ partials
│  │  ├─ footer.handlebars
│  ├─ home.handlebars
├─ .env
├─ .gitignore
├─ index.js
├─ package-lock.json
├─ package.json
├─ README.md
```

## Author

- @Sonia Villeda
- [Github](https://github.com/sovilleda07)
- [Linkedin](www.linkedin.com/in/soniavilleda)
