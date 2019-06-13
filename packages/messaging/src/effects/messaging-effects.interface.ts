import { Effect, Event } from '@marblejs/core';
import { TransportLayerConnection } from '../transport/transport.interface';

type MsgClient = TransportLayerConnection;

export interface MsgMiddlewareEffect<
  I = Event,
  O = Event,
> extends MsgEffect<I, O> {}

export interface MsgErrorEffect<
  Err extends Error = Error,
  I = Event,
  O = Event
> extends MsgEffect<I, O, MsgClient, Err> {}

export interface MsgEffect<
  I = Event,
  O = Event,
  Client = MsgClient,
  Err extends Error = Error,
> extends Effect<I, O, Client, Err> {}