const fonts = [
    'Roboto-Thin.ttf',
    'fontawesome-webfont.ttf',
    'fontawesome-webfont.woff',
    'fontawesome-webfont.woff2'
];

System.import('vendor/font-awesome').then(
    ()=>{
        fonts.forEach(font=>{
            const pathToFont = './fonts/'+font;
            require(`${pathToFont}`);
        })
    }
);


