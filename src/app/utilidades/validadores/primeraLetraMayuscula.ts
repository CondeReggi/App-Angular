import { AbstractControl , ValidatorFn } from "@angular/forms"

export function primeraLetraMayuscula(): ValidatorFn {
  return (control: AbstractControl) => {
    const valor = <string>control.value;
    if (!valor || valor.length === 0) return;

    const pirmerLetra = valor[0];

    if ( pirmerLetra === pirmerLetra.toLocaleLowerCase() ) return {
      primeraLetraMayuscula: {
        mensaje: 'La primera letra debe ser mayuscula'
      }
    }

    return;
  }
}
