export function toBase64(file: File) {

  return new Promise((resolve, reject) => { //Eventualmente carga la foto
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err)
  })

}

export function parsearErroresApi(response: any): string[] {
  const result: string[] = [];

  if (response.error) {
    if (typeof response.error === 'string') {
      result.push(response.error)
    } else if( Array.isArray(response.error) ) {
      response.error.forEach( element => {
        result.push("hola vengo de aca" + element.description)
      });
    } else {
      const errores = response.error.errors;

      if (errores) {
        const listadodeErrores = Object.entries(errores);

        listadodeErrores.forEach(nombre => {
          nombre.forEach(element => {
            result.push(element.toString());
          });
        })
      }

      // if (response.error.errors.Nombre) {
      //   const errores = response.error.errors.Nombre;
      //   // console.log(errores)
      //   // const entradas = Object.entries(errores)
      //   if (errores) {
      //     errores.forEach(mensaje => {
      //       result.push(mensaje);
      //     })
      //   }
      // }
    }
  }

  // console.log(result);
  return result
}

export function formatearFecha(date: Date) {

  date = new Date(date)

  const formato = new Intl.DateTimeFormat('en', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })

  const [
    { value: month }, ,
    { value: day }, ,
    { value: year }
  ] = formato.formatToParts(date)

  return `${year}-${month}-${day}`
}
