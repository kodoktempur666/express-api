import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import _ from 'lodash';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      req.cleanBody = _.pick(req.body, Object.keys(schema.shape));
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Change from error.errors to error.issues
        const errorMessages = error.issues.map((issue: any) => ({
          // Adjust issue.path based on how you want to display it
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}

// import { Request, Response, NextFunction } from 'express';
// import { z, ZodError } from 'zod';

// export function validateData(schema: z.ZodObject<any, any>) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       schema.parse(req.body);
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         const errorMessages = error.errors.map((issue: any) => ({
//           message: `${issue.path.join('.')} is ${issue.message}`,
//         }));
//         res.status(400).json({ error: 'Invalid data', details: errorMessages });
//       } else {
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
//     }
//   };
// }