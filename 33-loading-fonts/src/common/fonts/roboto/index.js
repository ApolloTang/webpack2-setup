
System.import('./index.less').then(
    ()=>{
        const fonts = [
            'Roboto-Thin.ttf'
        ];
        fonts.forEach(font=>{
            const pathToFont = './fonts/'+font;
            require(`${pathToFont}`);
        })
    }
);
