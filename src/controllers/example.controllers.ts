import { Request, Response } from 'express';

class ExampleController
{
    async helloWorld(req: Request, res: Response)
    {
        console.log('cid', req.headers.cid);
        return res.send('Hello Typescript');
    }

    testError(req: Request, res: Response)
    {
        throw new Error('Teste de erro.');
    }
}

export { ExampleController };
