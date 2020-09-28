import { Request, Response } from 'express';
import { pool } from '../../database';
import { QueryResult } from 'pg';
import { OutputResponse } from '../../class/OutputResponse';
import { isEmptyObject } from '../../utils/functions';

export const buscarProducto = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { pagina, registros, idsubcategoria, idsucursal, idstock, periodo, codigo, producto, estado } = req.query;
      //const response: QueryResult = await pool.query('SELECT json_agg(sigv_seguridad.inicia_session ($1, $2, $3)) as data;', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
        const response: QueryResult = await pool.query('SELECT json_agg(t1) as productos FROM (SELECT * from sigv_inventario.buscarproducto($1, $2, $3, $4, $5, $6, $7, $8, $9)) as t1;', [parseInt(pagina),parseInt(registros),parseInt(idsubcategoria),parseInt(idsucursal),parseInt(idstock),periodo,codigo.toUpperCase(), producto.toUpperCase(),estado.toUpperCase()]);
      //const response: QueryResult = await pool.query('SELECT to_json(sigv_seguridad.inicia_session ($1, $2, $3));', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
      //const response: QueryResult = await pool.query('SELECT sigv_seguridad.inicia_session ($1, $2, $3);', [usuario.toUpperCase(),clave.toUpperCase(),uniquedeviceid.toUpperCase()]);
      const rows = response.rows;
      const data = rows[0];
      /*console.log('response');
      console.log(response);
      console.log('rows');
      console.log(rows);
      console.log('data');
      console.log(data);*/
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


export const listarCategoria = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idcategoria, estado } = req.query;
    const response: QueryResult = await pool.query('SELECT json_agg(t1) as categorias FROM (SELECT * from sigv_inventario.listarcategoria($1, $2)) as t1;', [parseInt(idcategoria),estado.toUpperCase()]);
    const rows = response.rows;
    const data = rows[0];
    if(!isEmptyObject(data)){
      res.status(200);
      return res.json(data);
    }
    else {
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

export const listarSubcategoria = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idsubcategoria, idcategoria, estado } = req.query;
    const response: QueryResult = await pool.query('SELECT json_agg(t1) as subcategorias FROM (SELECT * from sigv_inventario.listarsubcategoria($1, $2, $3)) as t1;', [parseInt(idsubcategoria), parseInt(idcategoria), estado.toUpperCase()]);
    const rows = response.rows;
    const data = rows[0];
    if(!isEmptyObject(data)){
      res.status(200);
      return res.json(data);
    }
    else {
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

export const listarMarca = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idmarca, idsubcategoria, estado } = req.query;
    const response: QueryResult = await pool.query('SELECT json_agg(t1) as marcas FROM (SELECT * from sigv_inventario.listarmarca($1, $2, $3)) as t1;', [parseInt(idmarca), parseInt(idsubcategoria), estado.toUpperCase()]);
    const rows = response.rows;
    const data = rows[0];
    if(!isEmptyObject(data)){
      res.status(200);
      return res.json(data);
    }
    else {
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

export const insertarProducto = async (req: Request, res: Response) => {
  try {
    const { idproducto, codigo, descripcion, tipo, idsubcategoria, idmarca, idmedida, stock_min, stock_max , costo, pventa, imagen, estado, idusuarioalta, canalalta} = req.body;
    const response: QueryResult = await pool.query('SELECT * from sigv_inventario.insertarproducto($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);',
                  [ idproducto, codigo, descripcion, tipo, idsubcategoria, idmarca, idmedida, stock_min, stock_max , costo, pventa, imagen, estado, idusuarioalta, canalalta ]);
    const rows = response.rows;
    const data = rows[0];
    if(!isEmptyObject(data)){
      //console.log(data);
      res.status(200);
      return res.json(data);
    }
    else {
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
};