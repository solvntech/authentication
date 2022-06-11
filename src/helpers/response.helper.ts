export class ResponseHelper {
    static OK(data: any) {
        return {
            status: 200,
            result: data,
        };
    }

    static ERROR(status: number, data: any) {
        return {
            status: status,
            error: data,
        };
    }
}
