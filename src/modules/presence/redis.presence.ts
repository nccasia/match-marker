import { Presence } from "./interface/presence";

export class RedisPresence implements Presence {
    subscribe(topic: string, callback: Function) {
        throw new Error("Method not implemented.");
    }
    unsubscribe(topic: string, callback?: Function) {
        throw new Error("Method not implemented.");
    }
    publish(topic: string, data: any) {
        throw new Error("Method not implemented.");
    }
    exists(roomId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setex(key: string, value: string, seconds: number) {
        throw new Error("Method not implemented.");
    }
    get(key: string) {
        throw new Error("Method not implemented.");
    }
    del(key: string): void {
        throw new Error("Method not implemented.");
    }
    sadd(key: string, value: any) {
        throw new Error("Method not implemented.");
    }
    smembers(key: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    sismember(key: string, field: string) {
        throw new Error("Method not implemented.");
    }
    srem(key: string, value: any) {
        throw new Error("Method not implemented.");
    }
    scard(key: string) {
        throw new Error("Method not implemented.");
    }
    sinter(...keys: string[]): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    hset(key: string, field: string, value: string) {
        throw new Error("Method not implemented.");
    }
    hincrby(key: string, field: string, value: number) {
        throw new Error("Method not implemented.");
    }
    hget(key: string, field: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    hgetall(key: string): Promise<{ [key: string]: string; }> {
        throw new Error("Method not implemented.");
    }
    hdel(key: string, field: string) {
        throw new Error("Method not implemented.");
    }
    hlen(key: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    incr(key: string) {
        throw new Error("Method not implemented.");
    }
    decr(key: string) {
        throw new Error("Method not implemented.");
    }
    shutdown(): void {
        throw new Error("Method not implemented.");
    }
    
}