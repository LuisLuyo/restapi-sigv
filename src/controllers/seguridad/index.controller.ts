import { Request, Response } from 'express';
import { pool } from '../../database';
import { QueryResult } from 'pg';
import { OutputResponse } from '../../class/OutputResponse';
import { isEmptyObject } from '../../utils/functions';

export const getPrueba = async (req: Request, res: Response): Promise<Response> => {
  try {
    return res.status(200).json({ text: 'Thalia, Te quiero mucho, Atte. Pol ;)!' });
  } catch (e) {
      console.log(e);
      return res.status(500).json('Internal Server error');
  }
};

export const iniciaSesion = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { usuario, clave, uniquedeviceid } = req.body;
      //const response: QueryResult = await pool.query('SELECT json_agg(sigv_seguridad.inicia_session ($1, $2, $3)) as data;', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
      const response: QueryResult = await pool.query('SELECT row_to_json(sigv_seguridad.iniciasession ($1, $2, $3)) as data;', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
      //const response: QueryResult = await pool.query('SELECT to_json(sigv_seguridad.inicia_session ($1, $2, $3));', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
      //const response: QueryResult = await pool.query('SELECT sigv_seguridad.inicia_session ($1, $2, $3);', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
      const rows = response.rows;
      const data = rows[0].data;
      //console.log(rows);
      if(!isEmptyObject(data)){
        //const data = new OutputResponse("Success","Success","200","00","Token generado satisfactoriamente.","El Token se ha creado correctamente con el usuario y la clave ingresada.");
        res.status(200);
        return res.json(data);
      }
      else {
        //const data = new OutputResponse("Warning","Unauthorized","401","01","Usuario/clave incorrecto, volver a intentar.","Las credenciales del usuario/clave son inválidos.");
        res.status(404);
        return res.json(response);
      }
    } catch (e) {//console.error(e.stack);
      const message = new String(e.message);
      const description = new String(e.code + ': ' + e.routine + ' - ' + e.hint);
      const data = new OutputResponse("Error","Fatal","500","15",message.toString(),description.toString());
      console.log(e);
      res.status(500);
      return res.json(data);
    }
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM SIGV_SEGURIDAD.USUARIO ORDER BY idusuario ASC');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: { name, email }
        }
    })
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
}; 

export const menu = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = [{
        title: 'Principal',
        url: '/menu/main',
        icon: 'home',
        open: false
      },{
        title: 'Productos',
        open: false,
        children: [
          {
              title: 'Nuevo Producto',
              url: '../mantenimiento',
              icon: 'add-outline',
              open: false
          },
          {
            title: 'Precios',
            url: '../precios',
            icon: 'cash-outline',
            open: false
          }
        ]
    }
    ];
      res.status(200);
      return res.json(data);
    } catch (e) {//console.error(e.stack);
      const message = new String(e.message);
      const description = new String(e.code + ': ' + e.routine + ' - ' + e.hint);
      const data = new OutputResponse("Error","Fatal","500","15",message.toString(),description.toString());
      console.log(e);
      res.status(500);
      return res.json(data);
    }
  }