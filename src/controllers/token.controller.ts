import { Request, Response, NextFunction} from 'express';
import axios from 'axios'

export const callVerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const jwt = req.headers['jwt'];
    if(typeof jwt !== 'undefined') {
        try {
            const config = {
                headers: {
                    'jwt': jwt
                }
            };
            axios.post('http://' + process.env['TOKEN_HOSTNAME'] + ':' + process.env['TOKEN_PORT'] + '/api/arquitectura/token/validateToken',{},config)
            .then(function (response) {//////////// Solo si es 200 
                //console.log('Then');return res.status(response.status).json(response.data);
                next();
            })
            .catch(function (error) {//////////// Si es diferente que 200
                //console.log('catch');console.log(error);
                return res.status(error.response.status).json(error.response.data);
            });
            /*.finally(function () {
                console.log("pase aqui 3");
            });*/
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    } else {
        res.status(403).json({
        message: 'No se ha encontrado Token en la petición.'
        });
    }
};