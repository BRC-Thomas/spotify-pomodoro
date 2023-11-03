import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app:any) {
    app.use('/auth/**', 
        createProxyMiddleware({ 
            target: 'http://localhost:5000'
        })
    );
};
