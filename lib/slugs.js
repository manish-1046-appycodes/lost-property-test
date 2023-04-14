export const isCustomPageUri = (uri) => {

    const pagesToExclude = [
        '/events/',
        '/news/',
        
    ];

    return pagesToExclude.includes(uri)
}