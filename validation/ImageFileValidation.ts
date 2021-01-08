export class CheckForImageFileValidation {
  public static isFileValid(fileExt: string): Boolean {
    const allowedExtensions: string[] = ["jpeg", "jpg", "png", "gif"];

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
