export class CheckForFileExtensionValidation {
  public static isFileValid(
    fileExt: string,
    allowedExtensions: string[]
  ): Boolean {
    let i: number;
    let isValid = false;

    for (i = 0; i < allowedExtensions.length; i++) {
      if (fileExt == allowedExtensions[i]) {
        isValid = !isValid;
        break;
      }
    }
    return isValid;
  }
}
