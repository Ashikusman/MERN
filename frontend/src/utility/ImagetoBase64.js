
async function ImagetoBase64(file){
    //1.49.36
    const reader = new FileReader()
    reader.readAsDataURL(file)

    //Promise is used to check if the file is converted or not
    const data = new Promise((resolve,reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = err => reject(err)
    })
    return data
}
export {ImagetoBase64}