const fonts = [
    'Roboto-Thin.ttf',
    'fontawesome-webfont.ttf',
];

System.import('vendor/font-awesome').then(
    ()=>{
        fonts.forEach(font=>{
            const pathToFont = './fonts/'+font;
            require(`${pathToFont}`);
        })
    }
);


