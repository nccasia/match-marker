import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonService {
    retry<T = any>(
        cb: Function,
        maxRetries: number = 3,
        errorWhiteList: any[] = [],
        retries: number = 0,
      ) {
        return new Promise<T>((resolve, reject) => {
          cb()
            .then(resolve)
            .catch((e: any) => {
              if (
                errorWhiteList.indexOf(e.constructor) !== -1 &&
                retries++ < maxRetries
              ) {
                setTimeout(() => {
                  this.retry<T>(cb, maxRetries, errorWhiteList, retries).
                    then(resolve).
                    catch((e2: any) => reject(e2));
                }, Math.floor(Math.random() * Math.pow(2, retries) * 400));
      
              } else {
                reject(e);
              }
            });
        });
      }
}