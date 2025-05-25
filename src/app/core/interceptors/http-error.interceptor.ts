import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let mensaje = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        mensaje = 'No se pudo conectar con el servidor';
      } else if (error.error?.message) {
        mensaje = error.error.message;
      } else if (error.status === 404) {
        mensaje = 'Recurso no encontrado';
      } else if (error.status === 400) {
        mensaje = 'Solicitud inválida';
      } else if (error.status === 500) {
        mensaje = 'Error interno del servidor';
      }

      Swal.fire({
        icon: 'error',
        title: `Error ${error.status}`,
        text: mensaje,
        confirmButtonText: 'Aceptar'
      });

      throw error;
    })
  );
};
