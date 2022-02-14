/* Recibe un objeto con los campos a validar y devuelve un valor booleano indicando si todos los campos son válidos o no. Un objeto a validar completo sería:

{
    lastName: string, (alfabético con espacios y " ' ç ")
    firstName: string, (alfabético con espacios y " ' ç ")
    email: string,
    password: string, (mínimo ocho caracteres con al menos una minúscula, una mayúscula y un 
                        número)

    photo: file, (formatos: png, jpg, jpeg; tamaño máximo: 1024KB)
    
}

*/

import Swal from 'sweetalert2';
import isAlpha from 'validator/lib/isAlpha';
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';

import 'animate.css';

export const formValidate = ( fieldsObject ) => {

    if( fieldsObject.lastName && !isAlpha( fieldsObject.lastName, 'es-ES', { ignore: " 'ç" }) )
    {
        Swal.fire({
            title: 'Formulario inválido',
            text: 'El apellido sólo puede contener caracteres alfabéticos.',
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__backOutUp'
            }
          });

          return false;

    }else if( fieldsObject.firstName && !isAlpha( fieldsObject.firstName, 'es-ES', { ignore: " 'ç" }) )
    {
        Swal.fire({
            title: 'Formulario inválido',
            text: 'El nombre sólo puede contener caracteres alfabéticos.',
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__backOutUp'
            }
          });

          return false;

    }else if( fieldsObject.email && !isEmail( fieldsObject.email ) )
    {
        Swal.fire({
            title: 'Formulario inválido',
            text: 'Casilla de correo inválida.',
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__backOutUp'
            }
          });

          return false;

    }else if( fieldsObject.password && !isStrongPassword( fieldsObject.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    } ) )
    {
        Swal.fire({
            title: 'Contraseña demasiado débil.',
            text: 'La contraseña debe contener una longitud mínima de 8 caracteres, y al menos una minúscula, una mayúscula y un número.',
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__backOutUp'
            }
          });

          return false;

    }else if( fieldsObject.photo && ( !( fieldsObject.photo.name.endsWith( '.png' ) || fieldsObject.photo.name.endsWith( '.jpg' ) || fieldsObject.photo.name.endsWith( '.jpeg' ) ) || fieldsObject.photo.size > 1048576 ) )
    {
        Swal.fire({
            title: 'Imagen rechazada',
            text: 'El archivo debe ser menor a 1MB y su extensión puede ser .png, .jpg o .jpeg.',
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__backInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__backOutUp'
            }
          });

          return false;

    }

    return true;
}