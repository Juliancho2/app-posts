export const truncateString = (inputString, maxLength) => {

  const regex = /<p>([^<]*?)<\/p>/g; // Expresión regular para capturar contenido dentro de <p></p>
  const match = inputString.match(regex);
  if(match && match[1]){
    if (match[1].length <= maxLength) {
      return match[1];
    } else {
      return match[1].substring(0, maxLength) + "...";
    }
  }
}
