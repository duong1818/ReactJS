class CommonUtils {
    static isNumber1 (number) {
        if (number === 1) return true;
        return false;
    }

    /**
     * get the first element of the array to initialize a component
     * @param {*} array 
     * @returns 
     */
    static getFirstValueOfArr(array){
        return array && array.length > 0 ? array[0].key : ''; 
    }

    /**
     * covert image to base 64 to save file to DB with BLOB format
     * @param {*} file 
     * @returns base64 encoded
     */
    static getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    /**
     * convert base64 to URL to display the image
     * @param bufferBase64
     * @return url string
     */
    static getUrlFromBase64(base64) {
        return new Buffer.from(base64, 'base64').toString('binary');
    }


}

export default CommonUtils;