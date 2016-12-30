System.import('./font-awesome.css').then(
    ()=>{
        const fonts = [
            'fontawesome-webfont.ttf',
        ];
        fonts.forEach(font=>{
            const pathToFont = './fonts/'+font;
            require(`${pathToFont}`);
        })
    }
);
