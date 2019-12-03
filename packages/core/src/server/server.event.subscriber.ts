import * as http from 'http';
import * as https from 'https';
import * as net from 'net';
import { Subject, Observable } from 'rxjs';
import { ServerEventType, ServerEvent, AllServerEvents, isCloseEvent } from './server.event';
import { AddressInfo } from 'net';
import { takeWhile } from 'rxjs/operators';

export const subscribeServerEvents =
  (hostname: string) =>
  (httpServer: http.Server | https.Server): Observable<AllServerEvents> => {
    const event$ = new Subject<AllServerEvents>();

    httpServer.on(ServerEventType.CONNECT, (req: http.IncomingMessage, socket: net.Socket, head: Buffer) =>
      event$.next(ServerEvent.connect(req, socket, head)),
    );

    httpServer.on(ServerEventType.CONNECTION, (socket: net.Socket) =>
      event$.next(ServerEvent.connection(socket)),
    );

    httpServer.on(ServerEventType.CLIENT_ERROR, (error: Error, socket: net.Socket) =>
      event$.next(ServerEvent.clientError(error, socket)),
    );

    httpServer.on(ServerEventType.CLOSE, () =>
      event$.next(ServerEvent.close()),
    );

    httpServer.on(ServerEventType.CHECK_CONTINUE, (req: http.IncomingMessage, res: http.ServerResponse) =>
      event$.next(ServerEvent.checkContinue(req, res)),
    );

    httpServer.on(ServerEventType.CHECK_EXPECTATION, (req: http.IncomingMessage, res: http.ServerResponse) =>
      event$.next(ServerEvent.checkExpectation(req, res)),
    );

    httpServer.on(ServerEventType.ERROR, (error: Error) =>
      event$.next(ServerEvent.error(error)),
    );

    httpServer.on(ServerEventType.REQUEST, (req: http.IncomingMessage, res: http.ServerResponse) =>
      event$.next(ServerEvent.request(req, res)),
    );

    httpServer.on(ServerEventType.UPGRADE, (req: http.IncomingMessage, socket: net.Socket, head: Buffer) =>
      event$.next(ServerEvent.upgrade(req, socket, head)),
    );

    httpServer.on(ServerEventType.LISTENING, () => {
      const serverAddressInfo = httpServer.address() as AddressInfo;
      event$.next(ServerEvent.listening(serverAddressInfo.port, hostname));
    });

    return event$
      .asObservable()
      .pipe(takeWhile(e => !isCloseEvent(e)));
  };
