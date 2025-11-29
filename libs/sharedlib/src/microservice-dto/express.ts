import type { Request, Response } from 'express';

export type ExpressReq = Request & { session?: any };
export type ExpressResp = Response;
