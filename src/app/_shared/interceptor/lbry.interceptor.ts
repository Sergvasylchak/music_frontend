import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {constants} from "../utils/constants";

@Injectable()
export class LbryInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem(constants.HEADERS.AUTH_HEADER);

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set(constants.HEADERS.AUTH_HEADER, authToken)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
