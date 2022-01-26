export function toBase64(file : File){

  return new Promise( (resolve, reject) => { //Eventualmente carga la foto
    const reader = new FileReader();

    reader.readAsDataURL( file );
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err)
  } )

}
